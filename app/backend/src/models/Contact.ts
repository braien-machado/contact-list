import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ContactModel {
  static async getContacts() {
    const contacts = await prisma.contact.findMany({
      select: {
        id: true,
        fullName: true,
        phoneNumbers: {
          select: {
            phoneNumber: true, whatsapp: true, id: true,
          },
        },
        emails: {
          select: {
            email: true, id: true,
          },
        },
      },
    });
    return contacts;
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
