import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PhoneService from '../services/Phone';

export default class PhoneController {
  public static async deletePhoneById(req: Request, res: Response) {
    const { id } = req.params;
    await PhoneService.deletePhoneById(parseInt(id, 10));

    res.status(StatusCodes.NO_CONTENT).end();
  }

  public static async updatePhoneById(req: Request, res: Response) {
    const { id } = req.params;
    const intId = parseInt(id, 10);
    const { phoneNumber, whatsapp } = req.body;

    if (!phoneNumber) {
      await PhoneService.updatePhoneById(intId, { whatsapp });
    } else if (typeof whatsapp !== 'boolean') {
      await PhoneService.updatePhoneById(intId, { phoneNumber });
    } else {
      await PhoneService.updatePhoneById(intId, { phoneNumber, whatsapp });
    }

    res.status(StatusCodes.OK).json({ message: 'Phone has been updated successfully' });
  }
}
