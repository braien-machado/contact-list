/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';

import mockedEmail from '../mocks/email';
import EmailModel from '../../models/Email';
import EmailService from '../../services/Email';

describe('EmailService', () => {
  describe('getEmailByParam', () => {
    describe('when there is a match', () => {
      let getEmailByParamStub: SinonStub;

      before(async () => {
        getEmailByParamStub = sinon.stub(EmailModel, 'getEmailByParam').resolves(mockedEmail);
      });

      after(async () => {
        getEmailByParamStub.restore();
      });

      it('should return a Email', async () => {
        const response = await EmailService.getEmailByParam(1);
        expect(response).to.be.an('object');
      });

      it('the id should be equal to the param', async () => {
        const response = await EmailModel.getEmailByParam(1);

        expect(response?.id).to.be.equal(1);
      });
    });

    describe('when there is no match', () => {
      let getEmailByParamStub: SinonStub;

      before(async () => {
        getEmailByParamStub = sinon.stub(EmailModel, 'getEmailByParam').resolves(null);
      });

      after(async () => {
        getEmailByParamStub.restore();
      });

      it('should return null', async () => {
        const response = await EmailService.getEmailByParam('not_found@email.com', 'email');
        expect(response).to.be.equal(null);
      });
    });
  });

  describe('deleteEmailById', () => {
    let deleteEmailByIdStub: SinonStub;

    before(async () => {
      deleteEmailByIdStub = sinon.stub(EmailModel, 'deleteEmailById').resolves();
    });

    after(async () => {
      deleteEmailByIdStub.restore();
    });

    it('should return undefined', async () => {
      const response = await EmailService.deleteEmailById(1);
      expect(response).to.be.equal(undefined);
    });
  });

  describe('updateEmailById', () => {
    let updateEmailByIdStub: SinonStub;

    before(async () => {
      updateEmailByIdStub = sinon.stub(EmailModel, 'updateEmailById').resolves();
    });

    after(async () => {
      updateEmailByIdStub.restore();
    });

    it('should return undefined', async () => {
      const response = await EmailService.updateEmailById(1, 'another@email.com');
      expect(response).to.be.equal(undefined);
    });
  });

  describe('createEmail', () => {
    let createEmailStub: SinonStub;
    const email = 'test@test.com';
    const ownerId = 1;
    const newEmail = {
      id: 1,
      ownerId,
      email,
    };

    before(async () => {
      createEmailStub = sinon.stub(EmailModel, 'createEmail').resolves(newEmail);
    });

    after(async () => {
      createEmailStub.restore();
    });

    it('should return a Email', async () => {
      const response = await EmailService.createEmail({ email, ownerId });
      expect(response).to.be.an('object');
    });

    it('"ownerId" and "EmailNumber" properties should be equal to the param object', async () => {
      const response = await EmailModel.createEmail({ email, ownerId });

      expect(response.ownerId).to.be.equal(ownerId);
      expect(response.email).to.be.equal(email);
    });
  });
});
