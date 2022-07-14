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
}
