using System.ServiceModel;
using soap.Models;

[ServiceContract(Namespace = "http://example.com/library/wsdl")]
public interface ILibraryService
{
    [OperationContract]
    [FaultContract(typeof(ValidationFault))]
    int CreateBook(CreateBook request);

    [OperationContract]
    [FaultContract(typeof(NotFoundFault))]
    Tbook GetBookById(GetBookById request);

    [OperationContract]
    [FaultContract(typeof(ValidationFault))]
    Tbook UpdateBook(UpdateBook request);

    [OperationContract]
    [FaultContract(typeof(NotFoundFault))]
    Tbook DeleteBook(DeleteBook request);
}
