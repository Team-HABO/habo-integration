import { GraphQLContext } from "../context.js";

export const queries = {
  book: async (parent: any, args: { bookId: number }, context: GraphQLContext) => {
    const book = await context.prisma.tbook.findUnique({
      where: { nBookID: args.bookId },
    });
    if (!book) return null;
    return {
      bookId: book.nBookID,
      title: book.cTitle,
      authorId: book.nAuthorID,
      publishingYear: Number(book.nPublishingYear),
      publishingCompanyId: book.nPublishingCompanyID,
    };
  },
  books: async (parent: any, args: any, context: GraphQLContext) => {
    const dbBooks = await context.prisma.tbook.findMany();
    return dbBooks.map((book) => ({
      bookId: book.nBookID,
      title: book.cTitle,
      authorId: book.nAuthorID,
      publishingYear: book.nPublishingYear,
      publishingCompanyId: book.nPublishingCompanyID,
    }));
  },
  authors: async (parent: any, args: any, context: GraphQLContext) => {
    const dbAuthors = await context.prisma.tauthor.findMany();

    return dbAuthors.map((author) => ({
      authorId: author.nAuthorID,
      firstName: author.cName,
      lastName: author.cSurname || "", // Handle nulls
    }));
  },
  publishers: async (parent: any, args: any, context: GraphQLContext) => {
    const dbPublishers = await context.prisma.tpublishingcompany.findMany();
    return dbPublishers.map((publisher) => ({
      publishingCompanyId: publisher.nPublishingCompanyID,
      name: publisher.cName,
    }));
  },
};
