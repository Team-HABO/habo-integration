import { prisma } from "../../prisma/prisma";

export const createAuthor = async (name: string, surname: string) => {
	return await prisma.author.create({
		data: {
			name,
			surname
		}
	});
};

export const getAuthors = async () => {
	return await prisma.author.findMany();
};

export const getAuthorById = async (id: number) => {
	return await prisma.author.findUnique({
		where: {
			id: id
		}
	});
};

export const updateAuthor = async (id: number, name: string, surname: string) => {
	return await prisma.author.update({
		where: { id },
		data: { name, surname }
	});
};

export const deleteAuthor = async (id: number) => {
	return await prisma.author.delete({
		where: {
			id: id
		}
	});
};
