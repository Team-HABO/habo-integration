import * as repository from "../repositories/bookRepository";
import { AppError } from "../middlewares/errorHandler";

export const createBook = async (title: string, publishingYear: number, authorId: number, publishingCompanyId: number) => {
	if (!title) {
		throw new AppError(400, "title is undefined");
	}
	if (!publishingYear) {
		throw new AppError(400, "publishingYear is undefined");
	}
	if (!authorId) {
		throw new AppError(400, "authorId is undefined");
	}
	if (!publishingCompanyId) {
		throw new AppError(400, "publishingCompanyId is undefined");
	}

	const newBook = await repository.createBook(title, publishingYear, authorId, publishingCompanyId);
	return newBook;
};

export const getBooks = async (pageNum?: number, pageSize?: number) => {
	let offset = 0;
	if (pageNum && pageSize) {
		offset = (pageNum - 1) * pageSize;
	}

	return await repository.getBooks(pageSize, offset);
};

export const getBookById = async (id: number) => {
	const book = await repository.getBookById(id);

	if (!book) {
		throw new AppError(404, "Book not found");
	}

	return book;
};

export const updateBook = async (id: number, title: string, publishingYear: number, authorId: number, publishingCompanyId: number) => {
	if (!title) {
		throw new AppError(400, "title is undefined");
	}
	if (!publishingYear) {
		throw new AppError(400, "publishingYear is undefined");
	}
	if (!authorId) {
		throw new AppError(400, "authorId is undefined");
	}
	if (!publishingCompanyId) {
		throw new AppError(400, "publishingCompanyId is undefined");
	}

	return await repository.updateBook(id, title, publishingYear, authorId, publishingCompanyId);
};

export const deleteBook = async (id: number) => {
	await repository.deleteBook(id);
};
