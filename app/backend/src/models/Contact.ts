import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ContactModel {
  static async getContacts() {
    return prisma.contact.findMany({
      include: {
        emails: { select: { id: true, email: true } },
        phoneNumbers: { select: { id: true, phoneNumber: true, whatsapp: true } },
      },
    });
  }

  static async getContactById(id: number) {
    return prisma.contact.findUnique({ where: { id } });
  }

  static async deleteContactById(id: number) {
    const deletePhones = prisma.phone.deleteMany({ where: { ownerId: id } });
    const deleteEmails = prisma.email.deleteMany({ where: { ownerId: id } });
    const deleteContact = prisma.contact.deleteMany({ where: { id } });

    await prisma.$transaction([deletePhones, deleteEmails, deleteContact]);
  }

  static async updateContactById(id: number, fullName: string) {
    await prisma.contact.update({ where: { id }, data: { fullName } });
  }
}
