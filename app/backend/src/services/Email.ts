import EmailModel from '../models/Email';

export default class EmailService {
  public static async getEmailById(id: number) {
    return EmailModel.getEmailById(id);
  }

  public static async deleteEmailById(id: number) {
    await EmailModel.deleteEmailById(id);
  }
}
