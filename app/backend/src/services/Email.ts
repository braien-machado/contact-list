import IEmail from '../interfaces/IEmail';
import EmailModel from '../models/Email';

export default class EmailService {
  public static async getEmailByParam(value: number | string, param = 'id') {
    return EmailModel.getEmailByParam(value, param);
  }

  public static async deleteEmailById(id: number) {
    await EmailModel.deleteEmailById(id);
  }

  public static async updateEmailById(id: number, email: string) {
    await EmailModel.updateEmailById(id, email);
  }

  static async createEmail(obj: IEmail) {
    return EmailModel.createEmail(obj);
  }
}
