import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ContactModel {
  static async getContacts() {
    return prisma.contact.findMany({
      include: {
        emails: true,
        phoneNumbers: true,
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
}
