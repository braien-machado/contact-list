import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ContactService from '../services/Contact';

export default class ContactMiddleware {
  public static async validateId(req: Request, _res: Response, next: NextFunction) {
    const { id } = req.params;
    const contact = await ContactService.getContactById(parseInt(id, 10));

    if (!contact) return next({ code: StatusCodes.NOT_FOUND, message: 'Contact not found' });

    next();
  }

  public static async validateContactName(req: Request, _res: Response, next: NextFunction) {
    const { fullName } = req.body;

    if (!fullName) {
      return next({
        code: StatusCodes.BAD_REQUEST,
        message: 'fullName must be provided.',
      });
    }

    if (typeof fullName !== 'string') {
      return next({
        code: StatusCodes.BAD_REQUEST,
        message: 'fullName must be a string.',
      });
    }

    return next();
  }
}
