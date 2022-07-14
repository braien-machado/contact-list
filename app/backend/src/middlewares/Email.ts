import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import EmailService from '../services/Email';

export default class EmailMiddleware {
  public static async validateId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const contact = await EmailService.getEmailById(parseInt(id, 10));

    if (!contact) return next({ code: StatusCodes.NOT_FOUND, message: 'Email not found' });

    next();
  }
}
