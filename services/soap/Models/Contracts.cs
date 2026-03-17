using System.Runtime.Serialization;

namespace soap.Models
{
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
}
