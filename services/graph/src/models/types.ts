export interface Book {
  bookId: number;
  title: string;
  authorId: number;
  publishingYear: number;
  publishingCompanyId: number;
}
export interface Author {
  authorId: number;
  firstName: string;
  lastName: string;
}
export interface Publisher {
  publishingCompanyId: number;
  name: string;
}
