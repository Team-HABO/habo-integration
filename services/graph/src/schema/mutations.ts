import { GraphQLContext } from "../context.js";
import type { Book, Author, Publisher } from "../models/types.js";

export const mutations = {
  addBook: async (
    parent: any,
    args: {
      title: string;
      authorId: number;
      publishingYear: number;
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
    return {
      bookId: newBook.nBookID,
      title: newBook.cTitle,
      authorId: newBook.nAuthorID,
      // convert decimal to number
      publishingYear: Number(newBook.nPublishingYear),
      publishingCompanyId: newBook.nPublishingCompanyID,
    };
  },
  addAuthor: async (
    parent: any,
    args: { firstName: string; lastName: string },
    context: GraphQLContext,
  ): Promise<Author> => {
    const newAuthor = await context.prisma.tauthor.create({
      data: {
        cName: args.firstName,
        cSurname: args.lastName,
      },
    });
    return {
      authorId: newAuthor.nAuthorID,
      firstName: newAuthor.cName,
      lastName: newAuthor.cSurname || "",
    };
  },

  addPublisher: async (
    parent: any,
    args: { name: string },
    context: GraphQLContext,
  ): Promise<Publisher> => {
    const newPublisher = await context.prisma.tpublishingcompany.create({
      data: {
        cName: args.name,
      },
    });
    return {
      publishingCompanyId: newPublisher.nPublishingCompanyID,
      name: newPublisher.cName,
    };
  },
  updateBook: async (
    parent: any,
    args: {
      bookId: number;
      title?: string;
      authorId?: number;
      publishingYear?: number;
      publishingCompanyId?: number;
    },
    context: GraphQLContext,
  ): Promise<Book> => {
    const updated = await context.prisma.tbook.update({
      where: { nBookID: args.bookId },
      data: {
        cTitle: args.title,
        nAuthorID: args.authorId,
        nPublishingYear: args.publishingYear,
        nPublishingCompanyID: args.publishingCompanyId,
      },
    });
    return {
      bookId: updated.nBookID,
      title: updated.cTitle,
      authorId: updated.nAuthorID,
      publishingYear: Number(updated.nPublishingYear),
      publishingCompanyId: updated.nPublishingCompanyID,
    };
  },
  updateAuthor: async (
    parent: any,
    args: { authorId: number; firstName?: string; lastName?: string },
    context: GraphQLContext,
  ): Promise<Author> => {
    const updated = await context.prisma.tauthor.update({
      where: { nAuthorID: args.authorId },
      data: {
        cName: args.firstName,
        cSurname: args.lastName,
      },
    });
    return {
      authorId: updated.nAuthorID,
      firstName: updated.cName,
      lastName: updated.cSurname || "",
    };
  },

  updatePublisher: async (
    parent: any,
    args: { publishingCompanyId: number; name?: string },
    context: GraphQLContext,
  ): Promise<Publisher> => {
    const updated = await context.prisma.tpublishingcompany.update({
      where: { nPublishingCompanyID: args.publishingCompanyId },
      data: {
        cName: args.name,
      },
    });
    return {
      publishingCompanyId: updated.nPublishingCompanyID,
      name: updated.cName,
    };
  },
  deleteBook: async (
    parent: any,
    args: { bookId: number },
    context: GraphQLContext,
  ): Promise<Book> => {
    const deleted = await context.prisma.tbook.delete({
      where: { nBookID: args.bookId },
    });
    return {
      bookId: deleted.nBookID,
      title: deleted.cTitle,
      authorId: deleted.nAuthorID,
      publishingYear: Number(deleted.nPublishingYear),
      publishingCompanyId: deleted.nPublishingCompanyID,
    };
  },
  deleteAuthor: async (
    parent: any,
    args: { authorId: number },
    context: GraphQLContext,
  ): Promise<Author> => {
    const deleted = await context.prisma.tauthor.delete({
      where: { nAuthorID: args.authorId },
    });
    return {
      authorId: deleted.nAuthorID,
      firstName: deleted.cName,
      lastName: deleted.cSurname || "",
    };
  },
  deletePublisher: async (
    parent: any,
    args: { publishingCompanyId: number },
    context: GraphQLContext,
  ): Promise<Publisher> => {
    const deleted = await context.prisma.tpublishingcompany.delete({
      where: { nPublishingCompanyID: args.publishingCompanyId },
    });
    return {
      publishingCompanyId: deleted.nPublishingCompanyID,
      name: deleted.cName,
    };
  }
};
