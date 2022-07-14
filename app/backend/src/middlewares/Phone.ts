import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import PhoneService from '../services/Phone';

export default class PhoneMiddleware {
  public static async validateId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const contact = await PhoneService.getPhoneById(parseInt(id, 10));

    if (!contact) return next({ code: StatusCodes.NOT_FOUND, message: 'Phone not found' });

    next();
  }
}
