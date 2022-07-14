import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ContactService from '../services/Contact';

export default class ContactController {
  public static async getContacts(_req: Request, res: Response) {
    const contacts = await ContactService.getContacts();

    res.status(StatusCodes.OK).json({ result: contacts });
  }

  public static async deleteContactById(req: Request, res: Response) {
    const { id } = req.params;
    await ContactService.deleteContactById(parseInt(id, 10));

    res.status(StatusCodes.NO_CONTENT).end();
  }

  public static async updateContactById(req: Request, res: Response) {
    const { id } = req.params;
    const { fullName } = req.body;

    await ContactService.updateContactById(parseInt(id, 10), fullName);

    res.status(StatusCodes.OK).json({ message: 'Contact has been updated successfully' });
  }
}
