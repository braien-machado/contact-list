import React from 'react';
import IContact from '../interfaces/IContact';
import TableHead from './TableHead';
import TableRow from './TableRow';

interface TableProps {
  contacts: IContact[];
  updateList: () => void;
}

export default function Table(props: TableProps) {
  const { contacts, updateList } = props;

  return (
    <table>
      <TableHead />
      <tbody>
        {
          contacts.map((contact: IContact) => (
            <TableRow key={contact.id} contact={contact} updateList={updateList} />
          ))
        }
      </tbody>
    </table>
  );
}
