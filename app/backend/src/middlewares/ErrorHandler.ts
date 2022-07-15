import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class ErrorHandler {
  public static error(err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) {
    const { code, message } = err as any;

    if (!code || !message) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong.' });
    }

    return res.status(code).json({ message });
  }
}
