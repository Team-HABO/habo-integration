import * as repository from "../repositories/authorRepository";
import { AppError } from "../middlewares/errorHandler";

export const createAuthor = async (name: string, surname: string) => {
	if (!name) {
		throw new AppError(400, "name is undefined");
	}

	if (!surname) {
		throw new AppError(400, "surname is undefined");
	}

	const newAuthor = await repository.createAuthor(name, surname);
	return newAuthor;
};

export const getAuthors = async () => {
	return await repository.getAuthors();
};

export const getAuthorById = async (id: number) => {
	const author = await repository.getAuthorById(id);

	if (!author) {
		throw new AppError(404, "Author not found");
	}

	return author;
};

export const updateAuthor = async (id: number, name: string, surname: string) => {
	if (!name) {
		throw new AppError(400, "name is undefined");
	}

	if (!surname) {
		throw new AppError(400, "surname is undefined");
	}

	return await repository.updateAuthor(id, name, surname);
};

export const deleteAuthor = async (id: number) => {
	await repository.deleteAuthor(id);
};
