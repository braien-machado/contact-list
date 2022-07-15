/* eslint-disable max-lines-per-function */
import 'mocha';
import sinon, { SinonStub } from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';

import { app } from '../../app';
import ContactService from '../../services/Contact';
import mockedContacts from '../mocks/contact';
import PhoneService from '../../services/Phone';
import mockedPhone from '../mocks/phone';

chai.use(chaiHttp);
let response: Response;
let getContactStub: SinonStub;
let getPhoneStub: SinonStub;

const EXPECT_BAD_REQUEST = 'should have status 400';

describe('POST /phone', () => {
  describe('with no body', () => {
    before(async () => {
      response = await chai
        .request(app)
        .post('/phone')
        .send({});
    });

    it(EXPECT_BAD_REQUEST, async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'phoneNumber and ownerId values must be provided.\'', async () => {
      expect(response.body.message).to.be.equal('phoneNumber and ownerId values must be provided.');
    });
  });

  describe('with invalid phoneNumber format', () => {
    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);

      response = await chai
        .request(app)
        .post('/phone')
        .send({ ownerId: 1, phoneNumber: '5555555' });
    });

    after(() => { getContactStub.restore(); });

    it(EXPECT_BAD_REQUEST, async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'Invalid phone number format.\'', async () => {
      expect(response.body.message).to.be.equal('Invalid phone number format.');
    });
  });

  describe('with phoneNumber already in use', () => {
    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam').resolves(mockedPhone);

      response = await chai
        .request(app)
        .post('/phone')
        .send({ ownerId: 1, phoneNumber: '+55222222' });
    });

    after(() => {
      getContactStub.restore();
      getPhoneStub.restore();
    });

    it('should have status 409', async () => {
      expect(response).to.have.status(409);
    });

    it('should have message \'Phone is already in use.\'', async () => {
      expect(response.body.message).to.be.equal('Phone is already in use.');
    });
  });

  describe('with whatsapp not boolean', () => {
    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam').resolves(null);

      response = await chai
        .request(app)
        .post('/phone')
        .send({ ownerId: 1, phoneNumber: '+55222222', whatsapp: 'true' });
    });

    after(() => {
      getContactStub.restore();
      getPhoneStub.restore();
    });

    it(EXPECT_BAD_REQUEST, async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'Whatsapp value must be a boolean\'', async () => {
      expect(response.body.message).to.be.equal('Whatsapp value must be a boolean');
    });
  });

  describe('with new phone number', () => {
    let createPhoneStub: SinonStub;

    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam').resolves(null);
      createPhoneStub = sinon.stub(PhoneService, 'createPhone').resolves(mockedPhone);

      response = await chai
        .request(app)
        .post('/phone')
        .send({ ownerId: 1, phoneNumber: '+55222222', whatsapp: true });
    });

    after(() => {
      getContactStub.restore();
      getPhoneStub.restore();
      createPhoneStub.restore();
    });

    it('should have status 201', async () => {
      expect(response).to.have.status(201);
    });

    it('should have new email in body', async () => {
      expect(response.body).to.be.deep.equal(mockedPhone);
    });
  });
});
