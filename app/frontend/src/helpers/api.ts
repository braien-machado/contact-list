/* eslint-disable no-console */
import axios from 'axios';
import IContact from '../interfaces/IContact';
import IEmail from '../interfaces/IEmail';
import IPhone from '../interfaces/IPhone';

export const getContacts = async () => {
  const contacts = await axios.get('http://localhost:3001/')
    .then((response) => response.data.result)
    .catch((error) => console.log(error));

  return contacts as IContact[];
};

export const deleteContact = async (id: number) => {
  await axios.delete(`http://localhost:3001/${id}`);
};

export const deleteEmail = async (id: number) => {
  await axios.delete(`http://localhost:3001/email/${id}`);
};

export const deletePhone = async (id: number) => {
  await axios.delete(`http://localhost:3001/phone/${id}`);
};

export const patchPhone = async (id: number, phoneObj: Partial<IPhone>) => {
  const updated = await axios.patch(`http://localhost:3001/phone/${id}`, phoneObj)
    .then(() => true)
    .catch(() => false);

  return updated;
};

export const patchEmail = async (id: number, email: string) => {
  const updated = await axios.patch(`http://localhost:3001/email/${id}`, { email })
    .then(() => true)
    .catch(() => false);

  return updated;
};

export const createContact = async (fullName: string) => {
  await axios.post('http://localhost:3001/', { fullName })
    .catch((error) => {
      console.log(error);
    });
};

export const createPhone = async (phoneObj: Partial<IPhone>) => {
  const created = await axios.post('http://localhost:3001/phone', phoneObj)
    .then(() => true)
    .catch((error) => {
      console.log(error);
      return false;
    });

  return created;
};

export const createEmail = async (emailObj: Partial<IEmail>) => {
  const created = await axios.post('http://localhost:3001/email', emailObj)
    .then(() => true)
    .catch((error) => {
      console.log(error);
      return false;
    });

  return created;
};
