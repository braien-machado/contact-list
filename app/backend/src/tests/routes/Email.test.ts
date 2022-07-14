/* eslint-disable max-lines-per-function */
import 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';

import { app } from '../../app';

chai.use(chaiHttp);
let response: Response;

describe('POST /email', () => {
  describe('with no body', () => {
    before(async () => {
      response = await chai
        .request(app)
        .post('/email')
        .send({});
    });

    it('should have status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('should have message \'email and ownerId values must be provided.\'', async () => {
      expect(response.body.message).to.be.equal('email and ownerId values must be provided.');
    });
  });
});
