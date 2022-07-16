import React from 'react';
import styled from 'styled-components';
import IContact from '../interfaces/IContact';
import TableHead from './TableHead';
import TableRow from './TableRow';

interface TableProps {
  contacts: IContact[];
  updateList: () => void;
}

const MainContent = styled.table`
  width: 100vw;
  padding: 20px;

  th {
    text-align: left;
  }

  td {
    padding: 1em 0;
  }
`;

export default function Table(props: TableProps) {
  const { contacts, updateList } = props;

  return (
    <MainContent>
      <TableHead />
      <tbody>
        {
          contacts.map((contact: IContact) => (
            <TableRow key={contact.id} contact={contact} updateList={updateList} />
          ))
        }
      </tbody>
    </MainContent>
  );
}
