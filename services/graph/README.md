Made by following tutorial using typescript, yoga graphql, prisma and sqlite:
https://the-guild.dev/graphql/yoga-server/tutorial/basic
## Tech Stack

    Runtime: Node.js

    Language: TypeScript

    Server: GraphQL Yoga

    ORM: Prisma

    Database: SQLite

    Execution: tsx

## Features

The API supports the following operations at the /graphql endpoint:
Queries

    books: List all registered books.

    book(id: ID!): Fetch a specific book by its ID.

    authors: List all registered authors.

    publishers: List all registered publishing companies.

Mutations

    Books: Create, Update (all fields), and Delete.

    Authors: Create, Update (all fields), and Delete.

    Publishers: Create, Update (all fields), and Delete.

## Getting Started
1. Installation
Bash

npm install

2. Database Setup

Ensure your Prisma schema is synced with your SQLite database:
Bash

npx prisma generate
npx prisma db push

3. Running the Project

To start the development server with hot-reload:
Bash

npm run dev

The server will be available at http://localhost:4000/graphql, where you can use the built-in GraphiQL interface to test queries.



## Testing in yoga UI:
query GetBooks {
  books {
    bookId
    title
    authorId
    publishingYear
    publishingCompanyId
  }
}
query GetBookById {
  book(bookId: 1006) {
    title
  }
}
query GetAuthors {
  authors {
    authorId
    firstName
    lastName
  }
}
query GetPublishers {
  publishers {
    publishingCompanyId
    name
  }
}
mutation CreateNewBook {
  addBook(
    title: "Harry Potter and the Goblet of Fire!!",
    authorId: 394,
    publishingYear: 2000,
    publishingCompanyId: 74
  ) {
    bookId
    title
    publishingYear
  }
}
mutation CreateNewAuthor {
  addAuthor(
    firstName: "Harry",
    lastName: "Potter!"
  ) {
    authorId
    firstName
    lastName
  }
}
mutation DeleteAuthor{
  deleteAuthor(authorId:  1) {
    firstName
  }
}
mutation DeleteBook{
  deleteBook(bookId:  1007) {
    title
  }
}
mutation DeletePublisher{
  deletePublisher(publishingCompanyId: 2) {
    name
  }
}
mutation UpdateBook {
  updateBook(bookId: 1000, authorId: 1, title: "updated", publishingCompanyId: 1, publishingYear: 2026) {
    title
    bookId
    authorId
    publishingYear
    publishingCompanyId
  }
}
mutation UpdateAuthor {
  updateAuthor(authorId: 1, firstName: "bob", lastName: "marley") {
    firstName
  }
}
mutation CreateNewPublisher {
  addPublisher(
    name: "Harry pups",
  ) {
    publishingCompanyId
    name
  }
}
mutation UpdatePublisher {
  updatePublisher(publishingCompanyId: 2, name: "djhkjdnskldn"){
    name
  }
}
