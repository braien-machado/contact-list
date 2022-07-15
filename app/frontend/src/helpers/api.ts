import axios from 'axios';
import IContact from '../interfaces/IContact';

export const getContacts = async () => {
  const contacts = await axios.get('http://localhost:3001/')
    .then((response) => response.data.result)
    .catch((error) => console.log(error));

  return contacts as IContact[];
};

export const deleteTask = async (id: number) => {
  await axios.delete(`http://localhost:3001/task/${id}`);
};
