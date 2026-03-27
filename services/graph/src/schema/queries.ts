import { GraphQLContext } from "../context.js";
import { mapAuthorFromDb } from "../mappers/authorMapper.js";
import { mapBookFromDb } from "../mappers/bookMapper.js";
import { mapPublisherFromDb } from "../mappers/publisherMapper.js";
/**
 * GraphQL query resolvers that define how to fetch data for each query defined in the schema.
 * Only Book has get by id.
 */
export const queries = {
  book: async (
    parent: any,
    args: { bookId: number },
    context: GraphQLContext,
  ) => {
    const book = await context.prisma.tbook.findUnique({
      where: { nBookID: args.bookId },
    });
    if (!book) return null;
    return mapBookFromDb(book);
  },
  books: async (parent: any, args: any, context: GraphQLContext) => {
    const dbBooks = await context.prisma.tbook.findMany();
    return dbBooks.map(mapBookFromDb);
  },
  authors: async (parent: any, args: any, context: GraphQLContext) => {
    const dbAuthors = await context.prisma.tauthor.findMany();
    return dbAuthors.map(mapAuthorFromDb);
  },
  publishers: async (parent: any, args: any, context: GraphQLContext) => {
    const dbPublishers = await context.prisma.tpublishingcompany.findMany();
    return dbPublishers.map(mapPublisherFromDb);
  },
};
