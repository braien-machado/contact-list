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
      console.log(response);
      expect(response).to.be.an('object');
    });

    it('the id should be equal to the param', async () => {
      const response = await ContactModel.getContactById(1);

      expect(response?.id).to.be.equal(1);
    });
  });
});
