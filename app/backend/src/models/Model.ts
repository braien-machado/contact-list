import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ContactModel {
  static async getContacts() {
    const contacts = await prisma.contact.findMany({
      include: {
        phoneNumbers: true,
        emails: true,
      },
    });
    return contacts;
  }
}
