import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class EmailModel {
  static async getEmailById(id: number) {
    return prisma.email.findUnique({ where: { id } });
  }

  static async deleteEmailById(id: number) {
    await prisma.email.delete({ where: { id } });
  }
}
