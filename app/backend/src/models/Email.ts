import { PrismaClient } from '@prisma/client';
import IEmail from '../interfaces/IEmail';

const prisma = new PrismaClient();

type EmailValue = number | string;

export default class EmailModel {
  static async getEmailByParam(value: EmailValue, param = 'id') {
    return prisma.email.findUnique({ where: { [param]: value } });
  }

  static async deleteEmailById(id: number) {
    await prisma.email.delete({ where: { id } });
  }

  static async updateEmailById(id: number, email: string) {
    await prisma.email.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
  }

  static async createEmail(obj: IEmail) {
    return prisma.email.create({ data: obj });
  }
}
