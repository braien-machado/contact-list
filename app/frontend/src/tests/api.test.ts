/* eslint-disable no-console */
import axios from 'axios';
import * as request from '../helpers/api';
import IContact from '../interfaces/IContact';
import mockedContacts from './mocks/contact';

jest.mock('axios');

const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
const mockAxiosDelete = axios.delete as jest.MockedFunction<typeof axios.delete>;
const mockAxiosPatch = axios.patch as jest.MockedFunction<typeof axios.patch>;
const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

describe('request functions', () => {
  beforeEach(() => {
    global.console.log = jest.fn();
  });

  afterEach(() => jest.resetAllMocks());

  describe('getContacts', () => {
    let result: IContact[];

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosGet.mockImplementation(() => Promise.resolve(
          { data: { result: mockedContacts } },
        ));

        result = await request.getContacts();
      });

      it('should call axios.get', () => {
        expect(axios.get).toHaveBeenCalledTimes(1);
      });

      it('should return correct user', () => {
        expect(result).toStrictEqual(mockedContacts);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosGet.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.getContacts();
      });

      it('should return an empty array', () => {
        expect(result).toStrictEqual([]);
      });
    });
  });

  describe('deleteContact', () => {
    let result: void;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosDelete.mockImplementation(() => Promise.resolve());

        result = await request.deleteContact(1);
      });

      it('should call axios.delete', () => {
        expect(axios.delete).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosDelete.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.deleteContact(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('deleteEmail', () => {
    let result: void;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosDelete.mockImplementation(() => Promise.resolve());

        result = await request.deleteEmail(1);
      });

      it('should call axios.delete', () => {
        expect(axios.delete).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosDelete.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.deleteEmail(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('deletePhone', () => {
    let result: void;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosDelete.mockImplementation(() => Promise.resolve());

        result = await request.deletePhone(1);
      });

      it('should call axios.delete', () => {
        expect(axios.delete).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosDelete.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.deletePhone(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('patchPhone', () => {
    let result: boolean;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosPatch.mockImplementation(() => Promise.resolve());

        result = await request.patchPhone(1, { whatsapp: true });
      });

      it('should call axios.patch', () => {
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosPatch.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.patchPhone(1, { whatsapp: true });
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('patchName', () => {
    let result: boolean;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosPatch.mockImplementation(() => Promise.resolve());

        result = await request.patchName(1, 'Updated Name');
      });

      it('should call axios.patch', () => {
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosPatch.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.patchName(1, 'Updated Name');
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('patchEmail', () => {
    let result: boolean;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosPatch.mockImplementation(() => Promise.resolve());

        result = await request.patchEmail(1, 'updated@email.com');
      });

      it('should call axios.patch', () => {
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosPatch.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.patchEmail(1, 'updated@email.com');
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('createContact', () => {
    let result: void;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosPost.mockImplementation(() => Promise.resolve());

        result = await request.createContact('New Contact');
      });

      it('should call axios.post', () => {
        expect(axios.post).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosPost.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.createContact('New Contact');
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('createPhone', () => {
    let result: boolean;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosPost.mockImplementation(() => Promise.resolve());

        result = await request.createPhone({ phoneNumber: '+5511111', ownerId: 1 });
      });

      it('should call axios.post', () => {
        expect(axios.post).toHaveBeenCalledTimes(1);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosPost.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.createPhone({ phoneNumber: '+5511111' });
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('createEmail', () => {
    let result: boolean;

    describe('successful request', () => {
      beforeEach(async () => {
        mockAxiosPost.mockImplementation(() => Promise.resolve());

        result = await request.createEmail({ email: 'new@email.com', ownerId: 1 });
      });

      it('should call axios.post', () => {
        expect(axios.post).toHaveBeenCalledTimes(1);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        mockAxiosPost.mockImplementation(() => Promise.reject(new Error('error')));

        result = await request.createEmail({ email: 'new@email.com', ownerId: 1 });
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });

      it('should call console.log', () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });
});
