/* eslint-disable mocha/max-top-level-suites */
/* eslint-disable max-lines-per-function */
import 'mocha';
import sinon, { SinonStub } from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';

import { app } from '../../app';
import ContactService from '../../services/Contact';
import EmailService from '../../services/Email';
import mockedContacts from '../mocks/contact';
import mockedEmail from '../mocks/email';

chai.use(chaiHttp);
let response: Response;
let getContactStub: SinonStub;
let getEmailStub: SinonStub;
let createEmailStub: SinonStub;

const EXPECT_BAD_REQUEST = 'should have status 400';

describe('POST /email', () => {
  describe('with no body', () => {
    before(async () => {
      response = await chai
        .request(app)
        .post('/email')
        .send({});
    });

    it(EXPECT_BAD_REQUEST, async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'email and ownerId values must be provided.\'', async () => {
      expect(response.body.message).to.be.equal('email and ownerId values must be provided.');
    });
  });

  describe('with invalid ownerId value', () => {
    before(async () => {
      response = await chai
        .request(app)
        .post('/email')
        .send({ ownerId: 'invalid', email: 'valid@email.com' });
    });

    it(EXPECT_BAD_REQUEST, async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'Invalid ownerId value.\'', async () => {
      expect(response.body.message).to.be.equal('Invalid ownerId value.');
    });
  });

  describe('with unknown ownerId', () => {
    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(null);

      response = await chai
        .request(app)
        .post('/email')
        .send({ ownerId: 99999, email: 'valid@email.com' });
    });

    after(() => { getContactStub.restore(); });

    it('should have status 404', async () => {
      expect(response).to.have.status(404);
    });

    it('should have message \'Contact not found\'', async () => {
      expect(response.body.message).to.be.equal('Contact not found');
    });
  });

  describe('with invalid email', () => {
    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);

      response = await chai
        .request(app)
        .post('/email')
        .send({ ownerId: 1, email: 'invalid.email.com' });
    });

    after(() => { getContactStub.restore(); });

    it(EXPECT_BAD_REQUEST, async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'Invalid email format.\'', async () => {
      expect(response.body.message).to.be.equal('Invalid email format.');
    });
  });

  describe('with email already in use', () => {
    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);
      getEmailStub = sinon.stub(EmailService, 'getEmailByParam').resolves(mockedEmail);

      response = await chai
        .request(app)
        .post('/email')
        .send({ ownerId: 1, email: 'test@test.com' });
    });

    after(() => {
      getContactStub.restore();
      getEmailStub.restore();
    });

    it('should have status 409', async () => {
      expect(response).to.have.status(409);
    });

    it('should have message \'Email is already in use.\'', async () => {
      expect(response.body.message).to.be.equal('Email is already in use.');
    });
  });

  describe('with new email', () => {
    before(async () => {
      getContactStub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);
      getEmailStub = sinon.stub(EmailService, 'getEmailByParam').resolves(null);
      createEmailStub = sinon.stub(EmailService, 'createEmail').resolves(mockedEmail);

      response = await chai
        .request(app)
        .post('/email')
        .send({ ownerId: 1, email: 'test@test.com' });
    });

    after(() => {
      getContactStub.restore();
      getEmailStub.restore();
      createEmailStub.restore();
    });

    it('should have status 201', async () => {
      expect(response).to.have.status(201);
    });

    it('should have new email in body', async () => {
      expect(response.body).to.be.deep.equal(mockedEmail);
    });
  });
});

describe('DELETE /email/:id', () => {
  describe('with invalid id', () => {
    before(async () => {
      getEmailStub = sinon.stub(EmailService, 'getEmailByParam').resolves(null);

      response = await chai
        .request(app)
        .delete('/email/99999')
        .send({});
    });

    after(() => {
      getEmailStub.restore();
    });

    it('should have status 404', async () => {
      expect(response).to.have.status(404);
    });

    it('should have message \'Email not found\'', async () => {
      expect(response.body.message).to.be.equal('Email not found');
    });
  });

  describe('with valid id', () => {
    let deleteEmailStub: SinonStub;

    before(async () => {
      getEmailStub = sinon.stub(EmailService, 'getEmailByParam').resolves(mockedEmail);
      deleteEmailStub = sinon.stub(EmailService, 'deleteEmailById').resolves();

      response = await chai
        .request(app)
        .delete('/email/1')
        .send({});
    });

    after(() => {
      getEmailStub.restore();
      deleteEmailStub.restore();
    });

    it('should have status 204', async () => {
      expect(response).to.have.status(204);
    });
  });
});

describe('PATCH /email/:id', () => {
  describe('with valid id and body', () => {
    let updateEmailStub: SinonStub;

    before(async () => {
      getEmailStub = sinon.stub(EmailService, 'getEmailByParam')
        .onFirstCall()
        .resolves(mockedEmail)
        .onSecondCall()
        .resolves(null);
      updateEmailStub = sinon.stub(EmailService, 'updateEmailById').resolves();

      response = await chai
        .request(app)
        .patch('/email/1')
        .send({ email: 'updated@email.com' });
    });

    after(() => {
      getEmailStub.restore();
      updateEmailStub.restore();
    });

    it('should have status 200', async () => {
      expect(response).to.have.status(200);
    });

    it('should have message \'Email has been updated successfully\'', async () => {
      expect(response.body.message).to.be.equal('Email has been updated successfully');
    });
  });
});
