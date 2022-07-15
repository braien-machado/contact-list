/* eslint-disable max-lines */
/* eslint-disable mocha/max-top-level-suites */
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
const EXPECT_OK = 'should have status 200';
const EXPECT_UPDATED_MESSAGE = 'should have message \'Phone has been updated successfully\'';
const UPDATED_MESSAGE = 'Phone has been updated successfully';

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

describe('DELETE /phone/:id', () => {
  describe('with invalid id', () => {
    before(async () => {
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam').resolves(null);

      response = await chai
        .request(app)
        .delete('/phone/99999')
        .send({});
    });

    after(() => {
      getPhoneStub.restore();
    });

    it('should have status 404', async () => {
      expect(response).to.have.status(404);
    });

    it('should have message \'Phone not found\'', async () => {
      expect(response.body.message).to.be.equal('Phone not found.');
    });
  });

  describe('with valid id', () => {
    let deletePhoneStub: SinonStub;

    before(async () => {
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam').resolves(mockedPhone);
      deletePhoneStub = sinon.stub(PhoneService, 'deletePhoneById').resolves();

      response = await chai
        .request(app)
        .delete('/phone/1')
        .send({});
    });

    after(() => {
      getPhoneStub.restore();
      deletePhoneStub.restore();
    });

    it('should have status 204', async () => {
      expect(response).to.have.status(204);
    });
  });
});

describe('PATCH /phone/:id', () => {
  describe('with invalid body', () => {
    before(async () => {
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam').resolves(mockedPhone);

      response = await chai
        .request(app)
        .patch('/phone/1')
        .send({});
    });

    after(() => {
      getPhoneStub.restore();
    });

    it(EXPECT_BAD_REQUEST, async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'phoneNumber and/or whatsapp values must be provided.\'', async () => {
      expect(response.body.message)
        .to.be.equal('phoneNumber and/or whatsapp values must be provided.');
    });
  });

  describe('with valid phoneNumber and whatsapp', () => {
    let updatePhoneStub: SinonStub;

    before(async () => {
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam')
        .onFirstCall()
        .resolves(mockedPhone)
        .onSecondCall()
        .resolves(null);
      updatePhoneStub = sinon.stub(PhoneService, 'updatePhoneById').resolves();

      response = await chai
        .request(app)
        .patch('/phone/1')
        .send({ phoneNumber: '+552222222', whatsapp: false });
    });

    after(() => {
      getPhoneStub.restore();
      updatePhoneStub.restore();
    });

    it(EXPECT_OK, async () => {
      expect(response).to.have.status(200);
    });

    it(EXPECT_UPDATED_MESSAGE, async () => {
      expect(response.body.message).to.be.equal(UPDATED_MESSAGE);
    });
  });

  describe('with only phoneNumber', () => {
    let updatePhoneStub: SinonStub;

    before(async () => {
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam')
        .onFirstCall()
        .resolves(mockedPhone)
        .onSecondCall()
        .resolves(null);
      updatePhoneStub = sinon.stub(PhoneService, 'updatePhoneById').resolves();

      response = await chai
        .request(app)
        .patch('/phone/1')
        .send({ phoneNumber: '+552222222' });
    });

    after(() => {
      getPhoneStub.restore();
      updatePhoneStub.restore();
    });

    it(EXPECT_OK, async () => {
      expect(response).to.have.status(200);
    });

    it(EXPECT_UPDATED_MESSAGE, async () => {
      expect(response.body.message).to.be.equal(UPDATED_MESSAGE);
    });
  });

  describe('with only whatsapp', () => {
    let updatePhoneStub: SinonStub;

    before(async () => {
      getPhoneStub = sinon.stub(PhoneService, 'getPhoneByParam').resolves(mockedPhone);
      updatePhoneStub = sinon.stub(PhoneService, 'updatePhoneById').resolves();

      response = await chai
        .request(app)
        .patch('/phone/1')
        .send({ whatsapp: false });
    });

    after(() => {
      getPhoneStub.restore();
      updatePhoneStub.restore();
    });

    it(EXPECT_OK, async () => {
      expect(response).to.have.status(200);
    });

    it(EXPECT_UPDATED_MESSAGE, async () => {
      expect(response.body.message).to.be.equal(UPDATED_MESSAGE);
    });
  });
});
