import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ContactService from '../services/Contact';

export default class ContactMiddleware {
  public static async validateId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const contact = await ContactService.getContactById(parseInt(id, 10));

    if (!contact) return next({ code: StatusCodes.NOT_FOUND, message: 'Contact not found' });

    next();
  }
}
