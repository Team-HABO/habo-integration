import { prisma } from "../../prisma/prisma";

export const createBook = async (title: string, publishingYear: number, authorId: number, publishingCompanyId: number) => {
	return await prisma.book.create({
		data: {
			title,
			publishingYear,
			authorId,
			publishingCompanyId
		}
	});
};

export const getBooks = async (pageSize?: number, offset?: number) => {
	return await prisma.book.findMany({
		...(offset && { skip: offset }),
		...(pageSize && { take: pageSize })
	});
};

export const getBookById = async (id: number) => {
	return await prisma.book.findUnique({
		where: {
			id: id
		}
	});
};

export const updateBook = async (id: number, title: string, publishingYear: number, authorId: number, publishingCompanyId: number) => {
	return await prisma.book.update({
		where: { id },
		data: { title, publishingYear, authorId, publishingCompanyId }
	});
};

export const deleteBook = async (id: number) => {
	return await prisma.book.delete({
		where: {
			id: id
		}
	});
};
