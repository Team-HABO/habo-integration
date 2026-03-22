import type { Request, Response } from "express";

export class AppError extends Error {
	status?: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

export const errorHandler = (err: AppError, _req: Request, res: Response) => {
	console.error(err);
	res.status(err.status || 400).json({
		message: err.message || "Bad Request"
	});
};
