import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import EmailService from '../services/Email';

export default class EmailMiddleware {
  public static async validateId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const contact = await EmailService.getEmailByParam(parseInt(id, 10));

    if (!contact) return next({ code: StatusCodes.NOT_FOUND, message: 'Email not found' });

    next();
  }

  public static async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const regex = /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/;

    if (!regex.test(email)) {
      return next({
        code: StatusCodes.BAD_REQUEST,
        message: 'Invalid email format.',
      });
    }

    const emailInUse = await EmailService.getEmailByParam(email, 'email');

    if (!emailInUse) {
      next();
    }
    return next({
      code: StatusCodes.CONFLICT,
      message: 'Email is already in use.',
    });
  }
}
