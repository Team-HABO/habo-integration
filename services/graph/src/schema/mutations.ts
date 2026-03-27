import { GraphQLError } from "graphql/error/index.js";
import { GraphQLContext } from "../context.js";
import { mapAuthorFromDb } from "../mappers/authorMapper.js";
import { mapBookFromDb } from "../mappers/bookMapper.js";
import { mapPublisherFromDb } from "../mappers/publisherMapper.js";
import type { Book, Author, Publisher } from "../models/types.js";

/**
 * GraphQL mutation resolvers that define how to modify data for each mutation defined in the schema.
 * All three entities can be created, updated and deleted. For update and delete, the entity must exist, otherwise a NOT_FOUND error is thrown.
 * The resolvers use the Prisma client to interact with the database and the mappers to convert database records to GraphQL types.
 * The handleNotFoundError function is a helper that checks for Prisma's P2025 error code, which indicates that a record was not found during an update or delete operation, and throws a GraphQLError with a NOT_FOUND code instead.
 * In services/graph/src/mappers, the mappers convert the database records to the GraphQL types defined in services/graph/src/schema/types.ts. This separation of concerns allows for cleaner code and easier maintenance.
 */
export const mutations = {
  addBook: async (
    _: any,
    args: {
      title: string;
      authorId: number;
      publishingYear?: number;
      publishingCompanyId: number;
    },
    context: GraphQLContext,
  ): Promise<Book> => {
    const newBook = await context.prisma.tbook.create({
      data: {
        cTitle: args.title,
        nAuthorID: args.authorId,
        nPublishingYear: args.publishingYear,
        nPublishingCompanyID: args.publishingCompanyId,
      },
    });
    return mapBookFromDb(newBook);
  },
  updateBook: async (
    _: any,
    args: {
      bookId: number;
      title: string;
      authorId: number;
      publishingYear?: number;
      publishingCompanyId: number;
    },
    context: GraphQLContext,
  ): Promise<Book> => {
    try {
      const updated = await context.prisma.tbook.update({
        where: { nBookID: args.bookId },
        data: {
          cTitle: args.title,
          nAuthorID: args.authorId,
          nPublishingYear: args.publishingYear,
          nPublishingCompanyID: args.publishingCompanyId,
        },
      });
      return mapBookFromDb(updated);
    } catch (error: any) {
      handleNotFoundError(error, "update", "book", args.bookId);
    }
  },
  deleteBook: async (
    _: any,
    args: { bookId: number },
    context: GraphQLContext,
  ): Promise<Book> => {
    try {
      const deleted = await context.prisma.tbook.delete({
        where: { nBookID: args.bookId },
      });
      return mapBookFromDb(deleted);
    } catch (error: any) {
      handleNotFoundError(error, "delete", "book", args.bookId);
    }
  },
  addAuthor: async (
    _: any,
    args: { firstName: string; lastName?: string },
    context: GraphQLContext,
  ): Promise<Author> => {
    const newAuthor = await context.prisma.tauthor.create({
      data: {
        cName: args.firstName,
        cSurname: args.lastName,
      },
    });
    return mapAuthorFromDb(newAuthor);
  },
  updateAuthor: async (
    _: any,
    args: { authorId: number; firstName: string; lastName?: string },
    context: GraphQLContext,
  ): Promise<Author> => {
    try {
      const updated = await context.prisma.tauthor.update({
        where: { nAuthorID: args.authorId },
        data: {
          cName: args.firstName,
          cSurname: args.lastName,
        },
      });
      return mapAuthorFromDb(updated);
    } catch (error: any) {
      handleNotFoundError(error, "update", "author", args.authorId);
    }
  },
  deleteAuthor: async (
    _: any,
    args: { authorId: number },
    context: GraphQLContext,
  ): Promise<Author> => {
    try {
      const deleted = await context.prisma.tauthor.delete({
        where: { nAuthorID: args.authorId },
      });
      return mapAuthorFromDb(deleted);
    } catch (error: any) {
      handleNotFoundError(error, "delete", "author", args.authorId);
    }
  },

  addPublisher: async (
    _: any,
    args: { name: string },
    context: GraphQLContext,
  ): Promise<Publisher> => {
    const newPublisher = await context.prisma.tpublishingcompany.create({
      data: {
        cName: args.name,
      },
    });
    return mapPublisherFromDb(newPublisher);
  },
  updatePublisher: async (
    _: any,
    args: { publishingCompanyId: number; name: string },
    context: GraphQLContext,
  ): Promise<Publisher> => {
    try {
      const updated = await context.prisma.tpublishingcompany.update({
        where: { nPublishingCompanyID: args.publishingCompanyId },
        data: {
          cName: args.name,
        },
      });
      return mapPublisherFromDb(updated);
    } catch (error: any) {
      handleNotFoundError(
        error,
        "update",
        "publisher",
        args.publishingCompanyId,
      );
    }
  },
  deletePublisher: async (
    _: any,
    args: { publishingCompanyId: number },
    context: GraphQLContext,
  ): Promise<Publisher> => {
    try {
      const deleted = await context.prisma.tpublishingcompany.delete({
        where: { nPublishingCompanyID: args.publishingCompanyId },
      });
      return mapPublisherFromDb(deleted);
    } catch (error: any) {
      handleNotFoundError(
        error,
        "delete",
        "publisher",
        args.publishingCompanyId,
      );
    }
  },
};

function handleNotFoundError(
  error: any,
  method: string,
  entity: string,
  id: number,
): never {
  if (error.code === "P2025") {
    throw new GraphQLError(
      `Cannot ${method} non-existing ${entity} with id '${id}'.`,
      {
        extensions: { code: "NOT_FOUND" },
      },
    );
  }
  throw error;
}
