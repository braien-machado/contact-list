import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IEmail from '../interfaces/IEmail';
import EmailService from '../services/Email';

export default class EmailController {
  public static async deleteEmailById(req: Request, res: Response) {
    const { id } = req.params;
    await EmailService.deleteEmailById(parseInt(id, 10));

    res.status(StatusCodes.NO_CONTENT).end();
  }

  public static async updateEmailById(req: Request, res: Response) {
    const { id } = req.params;
    const { email } = req.body;

    await EmailService.updateEmailById(parseInt(id, 10), email);

    res.status(StatusCodes.OK).json({ message: 'Email has been updated successfully' });
  }

  public static async createEmail(req: Request, res: Response) {
    const { ownerId, email } = req.body as IEmail;
    const createdEmail = await EmailService.createEmail({ ownerId, email });

    res.status(StatusCodes.CREATED).json(createdEmail);
  }
}
