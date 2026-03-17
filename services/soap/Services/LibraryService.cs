using System.ServiceModel;
using soap.Data;
using soap.Models;

public class LibraryService(AppDbContext db) : ILibraryService
{
    private readonly AppDbContext _db = db;

    public int CreateBook(CreateBook request)
    {

        if (string.IsNullOrWhiteSpace(request.CTitle))
        {
            throw new FaultException<ValidationFault>(
                 new ValidationFault { ErrorCode = "INVALID_TITLE", ErrorMessage = "Title cannot be empty." },
                new FaultReason("Validation failed")
            );
        }

        if (request.NAuthorId <= 0)
        {
            throw new FaultException<ValidationFault>(
                new ValidationFault { ErrorCode = "INVALID_AUTHOR_ID", ErrorMessage = "Author ID must be a positive number." },
                new FaultReason("Validation failed")
            );
        }

        if (request.NPublishingCompanyId <= 0)
        {
            throw new FaultException<ValidationFault>(
                new ValidationFault { ErrorCode = "INVALID_PUBLISHING_COMPANY_ID", ErrorMessage = "Publishing company ID must be a positive number." },
                new FaultReason("Validation failed")
            );
        }

        if (request.NPublishingYear < 1000 || request.NPublishingYear > DateTime.UtcNow.Year)
        {
            throw new FaultException<ValidationFault>(
                new ValidationFault { ErrorCode = "INVALID_PUBLISHING_YEAR", ErrorMessage = $"Publishing year must be between 1000 and {DateTime.UtcNow.Year}." },
                new FaultReason("Validation failed")
            );
        }

        var book = new Tbook
        {
            CTitle = request.CTitle,
            NAuthorId = request.NAuthorId,
            NPublishingCompanyId = request.NPublishingCompanyId,
            NPublishingYear = request.NPublishingYear

        };

        _db.Tbooks.Add(book);
        _db.SaveChanges();
        return book.NBookId;
    }


    public Tbook DeleteBook(DeleteBook request)
    {
        var book = _db.Tbooks.FirstOrDefault(b => b.NBookId == request.NBookId);

        if (book is null)
        {
            throw new FaultException<NotFoundFault>(
                new NotFoundFault
                {
                    ErrorCode = "BOOK_NOT_FOUND",
                    ErrorMessage = $"No book with ID {request.NBookId}."
                },
                new FaultReason("Book not found")
            );
        }

        _db.Tbooks.Remove(book);
        _db.SaveChanges();
        return book;
    }

    public Tbook GetBookById(GetBookById request)
    {
        var book = _db.Tbooks.FirstOrDefault(b => b.NBookId == request.NBookId);

        if (book is null)
        {
            throw new FaultException<NotFoundFault>(
                new NotFoundFault
                {
                    ErrorCode = "BOOK_NOT_FOUND",
                    ErrorMessage = $"No book with ID {request.NBookId}."
                },
                new FaultReason("Book not found")
            );
        }

        return book;
    }

    public Tbook UpdateBook(UpdateBook request)
    {
        var book = _db.Tbooks.FirstOrDefault(b => b.NBookId == request.NBookId);

        if (book is null)
        {
            throw new FaultException<NotFoundFault>(
                new NotFoundFault
                {
                    ErrorCode = "BOOK_NOT_FOUND",
                    ErrorMessage = $"No book with ID {request.NBookId}."
                },
                new FaultReason("Book not found")
            );
        }

        if (request.CTitle is not null)
            book.CTitle = request.CTitle;

        if (request.NAuthorId is not null)
            book.NAuthorId = request.NAuthorId.Value;

        if (request.NPublishingYear is not null)
            book.NPublishingYear = request.NPublishingYear.Value;

        if (request.NPublishingCompanyId is not null)
            book.NPublishingCompanyId = request.NPublishingCompanyId.Value;

        _db.SaveChanges();
        return book;
    }
}
