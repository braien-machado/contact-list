import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PhoneService from '../services/Phone';

export default class PhoneController {
  public static async deletePhoneById(req: Request, res: Response) {
    const { id } = req.params;
    await PhoneService.deletePhoneById(parseInt(id, 10));

    res.status(StatusCodes.NO_CONTENT).end();
  }
}
