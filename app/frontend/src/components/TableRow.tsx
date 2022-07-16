import React from 'react';
import styled from 'styled-components';
import { deleteContact } from '../helpers/api';
import IContact from '../interfaces/IContact';
import Button from '../styles/Button';

interface TableRowProps {
  contact: IContact;
  updateList: () => void;
}

const ButtonTD = styled.td`
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled(Button)`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 25px;
  justify-content: center;
  width: 25px;
`;

export default function TableRow(props: TableRowProps) {
  const {
    contact: {
      id,
      fullName,
      phoneNumbers,
      emails,
    },
    updateList,
  } = props;

  const handleClick = async () => {
    await deleteContact(id);
    updateList();
  };

  return (
    <tr>
      <td>{ fullName }</td>
      <td>{ phoneNumbers.length > 0 && phoneNumbers[0].phoneNumber }</td>
      <td>{ emails.length > 0 && emails[0].email }</td>
      <ButtonTD>
        <DeleteButton type="button" onClick={handleClick}>X</DeleteButton>
      </ButtonTD>
    </tr>
  );
}
