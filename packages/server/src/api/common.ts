import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";

export class ClientSafeError extends Error {
	httpStatus: number;
	constructor(httpStatus: number, message: string) {
		super(message);
		this.httpStatus = httpStatus;
	}
}

const errorHandlerRouter = express.Router();

export function withErrorHandler<
	T extends (req: Request, res: Response, next: NextFunction) => void,
>(fn: T, errorMessage = "api failed...") {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (e) {
			console.error("withErrorHandler: ", e);
			if (e instanceof ClientSafeError) {
				res.status(e.httpStatus).json({ error: e.message });
			} else {
				// unhandled error
				res.status(500).json({ error: errorMessage });
			}
		}
	};
}

errorHandlerRouter.use((_req: Request, res: Response) => {
	// api not found
	res.status(404).json({ error: "api not found..." });
});

export { errorHandlerRouter };
