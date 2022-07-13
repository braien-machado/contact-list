import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class ContactController {
  public static async getContacts(req: Request, res: Response, _next: NextFunction) {
    res.status(StatusCodes.OK).json({ contacts: [] });
  }
}
