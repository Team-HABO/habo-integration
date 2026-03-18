using System.Runtime.Serialization;

namespace soap.Models;

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class CreateBook
{
    [DataMember(IsRequired = true)] public string CTitle { get; set; } = null!;

    [DataMember(IsRequired = true)] public int NAuthorId { get; set; }

    [DataMember(IsRequired = true)] public int NPublishingYear { get; set; }

    [DataMember(IsRequired = true)] public int NPublishingCompanyId { get; set; }
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class GetBookById
{
    [DataMember] public int NBookId { get; set; }
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class UpdateBook
{
    [DataMember(IsRequired = true)] public int NBookId { get; set; }

    [DataMember] public string? CTitle { get; set; }

    [DataMember] public int? NAuthorId { get; set; }

    [DataMember] public int? NPublishingYear { get; set; }

    [DataMember] public int? NPublishingCompanyId { get; set; }
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class DeleteBook
{
    [DataMember] public int NBookId { get; set; }
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class CreateAuthor
{
    [DataMember(IsRequired = true, Order = 0)]
    public string CName { get; set; } = null!;

    [DataMember(Order = 1)] public string CSurname { get; set; } = "";
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class GetAuthorById
{
    [DataMember] public int NAuthorId { get; set; }
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class ListAuthors
{
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class UpdateAuthor
{
    [DataMember(IsRequired = true, Order = 0)]
    public int NAuthorId { get; set; }

    [DataMember(Order = 1)] public string? CName { get; set; }

    [DataMember(Order = 2)] public string? CSurname { get; set; }
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class DeleteAuthor
{
    [DataMember] public int NAuthorId { get; set; }
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class NotFoundFault
{
    [DataMember] public string ErrorCode { get; set; } = null!;
    [DataMember] public string ErrorMessage { get; set; } = null!;
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class ValidationFault
{
    [DataMember] public string ErrorCode { get; set; } = null!;
    [DataMember] public string ErrorMessage { get; set; } = null!;
}

[DataContract(Namespace = "http://example.com/library/wsdl")]
public class ConflictFault
{
    [DataMember] public string ErrorCode { get; set; } = null!;
    [DataMember] public string ErrorMessage { get; set; } = null!;
}