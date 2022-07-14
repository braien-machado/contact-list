import { PrismaClient } from '@prisma/client';
import IPhone from '../interfaces/IPhone';

const prisma = new PrismaClient();

type PhoneValue = number | string;

export default class PhoneModel {
  static async getPhoneByParam(value: PhoneValue, param = 'id') {
    return prisma.phone.findUnique({ where: { [param]: value } });
  }

  static async deletePhoneById(id: number) {
    await prisma.phone.delete({ where: { id } });
  }

  static async updatePhoneById(id: number, obj: Partial<IPhone>) {
    await prisma.phone.update({
      where: {
        id,
      },
      data: obj,
    });
  }

  static async createPhone(obj: IPhone) {
    return prisma.phone.create({ data: obj });
  }
}
