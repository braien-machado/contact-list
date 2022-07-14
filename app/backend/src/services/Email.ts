import EmailModel from '../models/Email';

type EmailValue = number | string;

export default class EmailService {
  public static async getEmailByParam(value: EmailValue, param = 'id') {
    return EmailModel.getEmailByParam(value, param);
  }

  public static async deleteEmailById(id: number) {
    await EmailModel.deleteEmailById(id);
  }

  public static async updateEmailById(id: number, email: string) {
    await EmailModel.updateEmailById(id, email);
  }
}
