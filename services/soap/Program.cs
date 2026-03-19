using Microsoft.EntityFrameworkCore;
using soap.Data;
using soap.Services;
using SoapCore;

var builder = WebApplication.CreateBuilder(args);

// Register SQLite + EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=data/library.db"));

// Register SoapCore
builder.Services.AddSoapCore();
builder.Services.AddScoped<ILibraryService, LibraryService>();

var app = builder.Build();

app.UseSoapEndpoint<ILibraryService>("/LibraryService.asmx", new SoapEncoderOptions());

app.MapGet("/health", () => Results.Ok("healthy"));

app.Run();
