import * as repository from "../repositories/publisherRepsitory";
import { AppError } from "../middlewares/errorHandler";

export const createPublisher = async (name: string) => {
	const newPublisher = await repository.createPublisher(name);
	return newPublisher;
};

export const getPublishers = async () => {
	return await repository.getPublishers();
};

export const getPublisherById = async (id: number) => {
	const publisher = await repository.getPublisherById(id);

	if (!publisher) {
		throw new AppError(404, "Publisher not found");
	}

	return publisher;
};

export const updatePublisher = async (id: number, name: string) => {
	return await repository.updatePublisher(id, name);
};

export const deletePublisher = async (id: number) => {
	await repository.deletePublisher(id);
};
