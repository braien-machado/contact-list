/* eslint-disable mocha/max-top-level-suites */
/* eslint-disable max-lines-per-function */
import 'mocha';
import sinon, { SinonStub } from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';

import { app } from '../../app';
import mockedContacts, { newContact } from '../mocks/contact';
import ContactService from '../../services/Contact';

chai.use(chaiHttp);
let response: Response;
let stub: SinonStub;

describe('POST /', () => {
  describe('with no fullName', () => {
    before(async () => {
      response = await chai
        .request(app)
        .post('/')
        .send({});
    });

    it('should have status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'fullName must be provided.\'', async () => {
      expect(response.body.message).to.be.equal('fullName must be provided.');
    });
  });

  describe('with valid fullName', () => {
    before(async () => {
      stub = sinon.stub(ContactService, 'createContact').resolves(newContact);

      response = await chai
        .request(app)
        .post('/')
        .send({ fullName: 'TestName' });
    });

    after(() => {
      stub.restore();
    });

    it('should have status 201', async () => {
      expect(response).to.have.status(201);
    });

    it('should have new contact in body', async () => {
      expect(response.body).to.be.deep.equal(newContact);
    });
  });
});

describe('GET /', () => {
  before(async () => {
    stub = sinon.stub(ContactService, 'getContacts').resolves(mockedContacts);

    response = await chai
      .request(app)
      .get('/')
      .send({});
  });

  after(() => {
    stub.restore();
  });

  it('should have status 200', async () => {
    expect(response).to.have.status(200);
  });

  it('should have contacts in body', async () => {
    expect(response.body.result).to.be.deep.equal(mockedContacts);
  });
});
