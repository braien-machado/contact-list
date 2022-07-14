/* eslint-disable max-lines-per-function */
import 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';

import { app } from '../../app';

chai.use(chaiHttp);
let response: Response;

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
});