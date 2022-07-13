import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contactData: Prisma.ContactCreateInput[] = [
  {
    fullName: 'Braien Machado',
    phoneNumbers: {
      create: {
        phoneNumber: '22992444720',
        whatsapp: true,
      },
    },
    emails: {
      create: {
        email: 'braienmp@outlook.com',
      },
    },
  },
];

async function main() {
  console.log('Start seeding...')
  for (const contact of contactData) {
    const createdContact = await prisma.contact.create({
      data: contact,
    });
    console.log(`Created contact with id: ${createdContact.id}`)
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
