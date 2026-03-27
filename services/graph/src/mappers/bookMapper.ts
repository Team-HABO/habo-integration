import { Book } from "../models/types.js";

export function mapBookFromDb(book: any): Book {
  return {
    bookId: book.nBookID,
    title: book.cTitle,
    authorId: book.nAuthorID,
    publishingYear: Number(book.nPublishingYear),
    publishingCompanyId: book.nPublishingCompanyID,
  };
}
