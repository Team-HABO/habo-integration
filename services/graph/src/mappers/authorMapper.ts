import { Author } from "../models/types.js";

export function mapAuthorFromDb(author: any): Author {
  return {
    authorId: author.nAuthorID,
    firstName: author.cName,
    lastName: author.cSurname,
  };
}
