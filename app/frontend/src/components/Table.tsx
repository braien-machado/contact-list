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
    padding: 0 10px;
  }

  td {
    padding: 1em 10px;
    vertical-align: text-top;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100vw;
`;

export default function Table(props: TableProps) {
  const { contacts, updateList } = props;

  if (contacts.length === 0) {
    return (
      <MessageContainer>
        <p>You have not registered any contacts yet.</p>
      </MessageContainer>
    );
  }

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
