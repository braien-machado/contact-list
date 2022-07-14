/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';

import mockedPhone from '../mocks/phone';
import PhoneModel from '../../models/Phone';
import PhoneService from '../../services/Phone';

describe('PhoneService', () => {
  describe('getPhoneByParam', () => {
    let getPhoneByParamStub: SinonStub;

    before(async () => {
      getPhoneByParamStub = sinon.stub(PhoneModel, 'getPhoneByParam').resolves(mockedPhone);
    });

    after(async () => {
      getPhoneByParamStub.restore();
    });

    it('should return a Phone', async () => {
      const response = await PhoneService.getPhoneByParam(1);
      expect(response).to.be.an('object');
    });

    it('the id should be equal to the param', async () => {
      const response = await PhoneModel.getPhoneByParam(1);

      expect(response?.id).to.be.equal(1);
    });
  });

  describe('deletePhoneById', () => {
    let deletePhoneByIdStub: SinonStub;

    before(async () => {
      deletePhoneByIdStub = sinon.stub(PhoneModel, 'deletePhoneById').resolves();
    });

    after(async () => {
      deletePhoneByIdStub.restore();
    });

    it('should return undefined', async () => {
      const response = await PhoneService.deletePhoneById(1);
      expect(response).to.be.equal(undefined);
    });
  });

  describe('updatePhoneById', () => {
    let updatePhoneByIdStub: SinonStub;

    before(async () => {
      updatePhoneByIdStub = sinon.stub(PhoneModel, 'updatePhoneById').resolves();
    });

    after(async () => {
      updatePhoneByIdStub.restore();
    });

    it('should return undefined', async () => {
      const response = await PhoneService.updatePhoneById(1, { whatsapp: false });
      expect(response).to.be.equal(undefined);
    });
  });

  describe('createPhone', () => {
    let createPhoneStub: SinonStub;
    const phoneNumber = '+552235482';
    const ownerId = 1;
    const newPhone = {
      id: 1,
      ownerId,
      phoneNumber,
      whatsapp: false,
    };

    before(async () => {
      createPhoneStub = sinon.stub(PhoneModel, 'createPhone').resolves(newPhone);
    });

    after(async () => {
      createPhoneStub.restore();
    });

    it('should return a Phone', async () => {
      const response = await PhoneService.createPhone({ phoneNumber, ownerId });
      expect(response).to.be.an('object');
    });

    it('"ownerId" and "phoneNumber" properties should be equal to the param object', async () => {
      const response = await PhoneModel.createPhone({ phoneNumber, ownerId });

      expect(response.ownerId).to.be.equal(ownerId);
      expect(response.phoneNumber).to.be.equal(phoneNumber);
    });
  });
});
