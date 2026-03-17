# SoapCore + EF Core + SQLite Walkthrough

A step-by-step guide to scaffolding C# models from an existing SQLite database and using them as the data store behind a SoapCore SOAP service.

---

## Overview

```
users.db (SQLite)
    ↓  dotnet ef dbcontext scaffold
Models/User.cs + Data/AppDbContext.cs
    ↓  add [DataContract] in partial class
SoapCore reads [ServiceContract] + [DataContract]
    ↓  runtime
/UserService.asmx?wsdl  +  SQLite as live data store
```

---

## Step 1 — Scaffold models from your SQLite database

Install the required packages and run the EF Core scaffold command:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design

dotnet ef dbcontext scaffold \
  "Data Source=users.db" \
  Microsoft.EntityFrameworkCore.Sqlite \
  --output-dir Models \
  --context-dir Data \
  --context AppDbContext \
  --no-onconfiguring
```

This generates a `Models/` folder with a class per table, plus `Data/AppDbContext.cs`.

### Generated model (`Models/User.cs`)

```csharp
public partial class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Status { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
```

### Generated DbContext (`Data/AppDbContext.cs`)

```csharp
public partial class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired();
        });
    }
}
```

---

## Step 2 — Decorate the scaffolded models for SoapCore

Because the scaffolded class is `partial`, you can add `[DataContract]` attributes in a separate file. This means re-running `scaffold` will never overwrite your SOAP-specific additions.

```csharp
// Models/User.Soap.cs
using System.Runtime.Serialization;

[MetadataType(typeof(User))]
[DataContract(Namespace = "http://example.com/users")]
public partial class User
{
    [DataMember] public int Id { get; set; }
    [DataMember] public string Username { get; set; } = null!;
    [DataMember] public string Email { get; set; } = null!;
    [DataMember] public string Status { get; set; } = null!;
    [DataMember] public DateTime CreatedAt { get; set; }
}
```

> **Tip:** Keep all SOAP-specific attributes in `*.Soap.cs` partial files so scaffolding never touches them.

---

## Step 3 — Define request, response, and fault types

```csharp
// Models/Contracts.cs
using System.Runtime.Serialization;

[DataContract(Namespace = "http://example.com/users")]
public class CreateUserRequest
{
    [DataMember] public string Username { get; set; } = null!;
    [DataMember] public string Email { get; set; } = null!;
}

[DataContract(Namespace = "http://example.com/users")]
public class GetUserRequest
{
    [DataMember] public int UserId { get; set; }
}

[DataContract(Namespace = "http://example.com/users")]
public class UserServiceFault
{
    [DataMember] public string ErrorCode { get; set; } = null!;
    [DataMember] public string ErrorMessage { get; set; } = null!;
}
```

---

## Step 4 — Define the service interface

```csharp
// IUserService.cs
using System.ServiceModel;

[ServiceContract(Namespace = "http://example.com/users/wsdl")]
public interface IUserService
{
    [OperationContract]
    [FaultContract(typeof(UserServiceFault))]
    User CreateUser(CreateUserRequest request);

    [OperationContract]
    [FaultContract(typeof(UserServiceFault))]
    User GetUser(GetUserRequest request);
}
```

---

## Step 5 — Implement the service with EF Core

```csharp
// UserService.cs
using System.ServiceModel;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db)
    {
        _db = db;
    }

    public User CreateUser(CreateUserRequest request)
    {
        bool emailTaken = _db.Users.Any(u => u.Email == request.Email);
        if (emailTaken)
        {
            throw new FaultException<UserServiceFault>(
                new UserServiceFault
                {
                    ErrorCode    = "EMAIL_ALREADY_EXISTS",
                    ErrorMessage = $"Email {request.Email} is already in use."
                },
                new FaultReason("Duplicate email")
            );
        }

        var user = new User
        {
            Username  = request.Username,
            Email     = request.Email,
            Status    = "ACTIVE",
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        _db.SaveChanges();
        return user;
    }

    public User GetUser(GetUserRequest request)
    {
        var user = _db.Users.FirstOrDefault(u => u.Id == request.UserId);

        if (user is null)
        {
            throw new FaultException<UserServiceFault>(
                new UserServiceFault
                {
                    ErrorCode    = "USER_NOT_FOUND",
                    ErrorMessage = $"No user with ID {request.UserId}."
                },
                new FaultReason("User not found")
            );
        }

        return user;
    }
}
```

---

## Step 6 — Register everything in Program.cs

```csharp
// Program.cs
using Microsoft.EntityFrameworkCore;
using SoapCore;

var builder = WebApplication.CreateBuilder(args);

// Register SQLite + EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=users.db"));

// Register SoapCore
builder.Services.AddSoapCore();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.UseSoapEndpoint<IUserService>(
        path: "/UserService.asmx",
        new SoapEncoderOptions(),
        SoapSerializer.DataContractSerializer
    );
});

app.Run();
```

The WSDL is auto-served at `/UserService.asmx?wsdl` once the app is running.

---

## Key things to watch out for

- **Re-scaffolding overwrites generated files.** Use `partial class` and separate `*.Soap.cs` files to keep your `[DataContract]` attributes safe.
- **SoapCore is code-first.** It generates WSDL from your C# attributes at runtime — it does not read an existing WSDL file.
- **To go contract-first** (WSDL → C# types), use `dotnet-svcutil` to generate the data contracts, then wire them into SoapCore manually.

---

## NuGet packages required

| Package | Purpose |
|---|---|
| `SoapCore` | SOAP middleware for ASP.NET Core |
| `Microsoft.EntityFrameworkCore.Sqlite` | EF Core SQLite provider |
| `Microsoft.EntityFrameworkCore.Design` | Required for `dotnet ef` CLI commands |
