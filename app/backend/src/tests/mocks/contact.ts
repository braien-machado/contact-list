const mockedContacts = [
  {
    id: 1,
    fullName: 'Nome de teste',
    emails: [],
    phoneNumbers: [
      {
        id: 2,
        phoneNumber: '+55222222',
        whatsapp: false,
      },
    ],
  },
  {
    id: 2,
    fullName: 'Nome de teste',
    emails: [
      {
        id: 1,
        email: 'teste@email.com',
      },
    ],
    phoneNumbers: [
      {
        id: 1,
        phoneNumber: '+555555555',
        whatsapp: true,
      },
    ],
  },
];

export default mockedContacts;
