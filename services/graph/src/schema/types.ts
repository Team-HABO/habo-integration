export const typeDefinitions = /* GraphQL */ `
  type Book {
    bookId: Int!
    title: String!
    authorId: Int!
    publishingYear: Int!
    publishingCompanyId: Int!
  }
  type Author {
    authorId: Int!
    firstName: String!
    lastName: String!
  }
  type Publisher {
    publishingCompanyId: Int!
    name: String!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
    publishers: [Publisher!]!
    book(bookId: Int!): Book
  }

  type Mutation {
    addBook(
      title: String!
      authorId: Int!
      publishingYear: Int!
      publishingCompanyId: Int!
    ): Book!
    addAuthor(firstName: String!, lastName: String!): Author!
    addPublisher(name: String!): Publisher!
    updateBook(
      bookId: Int!
      title: String
      authorId: Int
      publishingYear: Int
      publishingCompanyId: Int
    ): Book!
    updateAuthor(authorId: Int!, firstName: String, lastName: String): Author!
    updatePublisher(publishingCompanyId: Int!, name: String): Publisher!
    deleteBook(bookId: Int!): Book!
    deleteAuthor(authorId: Int!): Author!
    deletePublisher(publishingCompanyId: Int!): Publisher!
  }
`;
