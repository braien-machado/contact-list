import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import PhoneService from '../services/Phone';

export default class PhoneMiddleware {
  public static async validatePhoneBody(req: Request, res: Response, next: NextFunction) {
    const { whatsapp, phoneNumber } = req.body;

    if (typeof whatsapp !== 'boolean' && !phoneNumber) {
      return next({
        code: StatusCodes.BAD_REQUEST,
        message: 'phoneNumber and/or whatsapp values must be provided.',
      });
    }

    next();
  }

  public static async validateId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const contact = await PhoneService.getPhoneByParam(parseInt(id, 10));

    if (!contact) return next({ code: StatusCodes.NOT_FOUND, message: 'Phone not found' });

    next();
  }

  public static async validatePhoneNumber(req: Request, res: Response, next: NextFunction) {
    const { phoneNumber } = req.body;
    const regex = /^\+[1-9][0-9]\d{1,14}$/;

    if (!phoneNumber) return next();

    if (!regex.test(phoneNumber)) {
      return next({
        code: StatusCodes.BAD_REQUEST,
        message: 'Invalid phone number format.',
      });
    }

    const phoneInUse = await PhoneService.getPhoneByParam(phoneNumber, 'phoneNumber');

    if (!phoneInUse) return next();
    return next({
      code: StatusCodes.CONFLICT,
      message: 'Phone is already in use.',
    });
  }

  public static async validateWhatsappBool(req: Request, res: Response, next: NextFunction) {
    const { whatsapp } = req.body;

    if (!whatsapp || typeof whatsapp === 'boolean') return next();

    return next({
      code: StatusCodes.BAD_REQUEST,
      message: 'Whatsapp value must be a boolean',
    });
  }
}
