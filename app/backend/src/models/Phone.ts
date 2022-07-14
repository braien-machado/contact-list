import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class PhoneModel {
  static async getPhoneById(id: number) {
    return prisma.phone.findUnique({ where: { id } });
  }

  static async deletePhoneById(id: number) {
    await prisma.phone.delete({ where: { id } });
  }
}
