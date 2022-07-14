import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type EmailValue = number | string;

export default class EmailModel {
  static async getEmailByParam(value: EmailValue, param = 'id') {
    return prisma.email.findUnique({ where: { [param]: value } });
  }

  static async deleteEmailById(id: number) {
    await prisma.email.delete({ where: { id } });
  }

  static async updateEmailBydId(id: number, email: string) {
    await prisma.email.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
  }
}
