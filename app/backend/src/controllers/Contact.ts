import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ContactService from '../services/Contact';

export default class ContactController {
  public static async getContacts(req: Request, res: Response, _next: NextFunction) {
    const contacts = await ContactService.getContacts();

    res.status(StatusCodes.OK).json({ result: contacts });
  }
}
