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

  describe('with invalid fullName', () => {
    before(async () => {
      response = await chai
        .request(app)
        .post('/')
        .send({ fullName: true });
    });

    it('should have status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'fullName must be a string.\'', async () => {
      expect(response.body.message).to.be.equal('fullName must be a string.');
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

describe('DELETE /:id', () => {
  describe('with invalid id', () => {
    before(async () => {
      stub = sinon.stub(ContactService, 'getContactById').resolves(null);

      response = await chai
        .request(app)
        .delete('/99999')
        .send({});
    });

    after(() => {
      stub.restore();
    });

    it('should have status 404', async () => {
      expect(response).to.have.status(404);
    });

    it('should have message \'Contact not found\'', async () => {
      expect(response.body.message).to.be.equal('Contact not found');
    });
  });

  describe('with valid id', () => {
    let deleteContactStub: SinonStub;

    before(async () => {
      stub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);
      deleteContactStub = sinon.stub(ContactService, 'deleteContactById').resolves();

      response = await chai
        .request(app)
        .delete('/1')
        .send({});
    });

    after(() => {
      stub.restore();
      deleteContactStub.restore();
    });

    it('should have status 204', async () => {
      expect(response).to.have.status(204);
    });
  });
});

describe('PATCH /:id', () => {
  describe('with valid id and body', () => {
    let updateContactStub: SinonStub;

    before(async () => {
      stub = sinon.stub(ContactService, 'getContactById').resolves(mockedContacts[0]);
      updateContactStub = sinon.stub(ContactService, 'updateContactById').resolves();

      response = await chai
        .request(app)
        .patch('/1')
        .send({ fullName: 'valid name' });
    });

    after(() => {
      stub.restore();
      updateContactStub.restore();
    });

    it('should have status 200', async () => {
      expect(response).to.have.status(200);
    });

    it('should have message \'Contact has been updated successfully\'', async () => {
      expect(response.body.message).to.be.equal('Contact has been updated successfully');
    });
  });
});

describe('Error Middleware default', () => {
  before(async () => {
    stub = sinon.stub(ContactService, 'getContacts').throws();

    response = await chai
      .request(app)
      .get('/')
      .send({});
  });

  after(() => {
    stub.restore();
  });

  it('should have status 500', async () => {
    expect(response).to.have.status(500);
  });

  it('should have error message \'Something went wrong.\'', async () => {
    expect(response.body.error).to.be.equal('Something went wrong.');
  });
});
