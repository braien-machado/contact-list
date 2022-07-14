import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import EmailService from '../services/Email';

export default class EmailController {
  public static async deleteEmailById(req: Request, res: Response) {
    const { id } = req.params;
    await EmailService.deleteEmailById(parseInt(id, 10));

    res.status(StatusCodes.NO_CONTENT).end();
  }
}
