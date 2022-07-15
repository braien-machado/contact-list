/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';

import mockedContacts from '../mocks/contact';
import ContactService from '../../services/Contact';
import ContactModel from '../../models/Contact';

describe('ContactService', () => {
  describe('getContacts', () => {
    let getContactsStub: SinonStub;

    before(async () => {
      getContactsStub = sinon.stub(ContactModel, 'getContacts').resolves(mockedContacts);
    });

    after(async () => {
      getContactsStub.restore();
    });

    it('should return an array of contacts', async () => {
      const response = await ContactService.getContacts();
      expect(response).to.be.an('array');
    });

    it('each contact should have the expected properties', async () => {
      const response = await ContactModel.getContacts();
      const properties = ['id', 'fullName', 'phoneNumbers', 'emails'];

      properties.forEach((property) => {
        expect(response[0]).to.have.property(property);
      });
    });
  });

  describe('getContactById', () => {
    let getContactByIdStub: SinonStub;

    before(async () => {
      getContactByIdStub = sinon.stub(ContactModel, 'getContactById').resolves(mockedContacts[0]);
    });

    after(async () => {
      getContactByIdStub.restore();
    });

    it('should return a contact', async () => {
      const response = await ContactService.getContactById(1);
      expect(response).to.be.an('object');
    });

    it('the id should be equal to the param', async () => {
      const response = await ContactModel.getContactById(1);

      expect(response?.id).to.be.equal(1);
    });
  });

  describe('deleteContactById', () => {
    let deleteContactByIdStub: SinonStub;

    before(async () => {
      deleteContactByIdStub = sinon.stub(ContactModel, 'deleteContactById').resolves();
    });

    after(async () => {
      deleteContactByIdStub.restore();
    });

    it('should return undefined', async () => {
      const response = await ContactService.deleteContactById(1);
      expect(response).to.be.equal(undefined);
    });
  });

  describe('updateContactById', () => {
    let updateContactByIdStub: SinonStub;

    before(async () => {
      updateContactByIdStub = sinon.stub(ContactModel, 'updateContactById').resolves();
    });

    after(async () => {
      updateContactByIdStub.restore();
    });

    it('should return undefined', async () => {
      const response = await ContactService.updateContactById(1, 'AnotherName');
      expect(response).to.be.equal(undefined);
    });
  });

  describe('createContact', () => {
    let createContactStub: SinonStub;
    const fullName = 'New Contact';
    const newContact = {
      id: 1,
      fullName,
      emails: [],
      phoneNumbers: [],
    };

    before(async () => {
      createContactStub = sinon.stub(ContactModel, 'createContact').resolves(newContact);
    });

    after(async () => {
      createContactStub.restore();
    });

    it('should return a contact', async () => {
      const response = await ContactService.createContact(fullName);
      expect(response).to.be.an('object');
    });

    it('"fullName" property should be equal to the param', async () => {
      const response = await ContactModel.createContact(fullName);

      expect(response.fullName).to.be.equal(fullName);
    });
  });
});
