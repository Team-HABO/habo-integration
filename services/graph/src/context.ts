import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import sqlite from "better-sqlite3";

const betterSqlite = new sqlite("./prisma/library.db");
const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/library.db",
});
const prisma = new PrismaClient({ adapter });

export type GraphQLContext = {
  prisma: PrismaClient;
};

export const createContext = (): GraphQLContext => {
  return { prisma };
};
