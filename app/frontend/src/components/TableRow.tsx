import React from 'react';
import styled from 'styled-components';
import { deleteContact } from '../helpers/api';
import IContact from '../interfaces/IContact';
import Button from '../styles/Button';
import Whatsapp from './WhatsappIcon';

interface TableRowProps {
  contact: IContact;
  updateList: () => void;
}

const ButtonTD = styled.td`
  display: flex;
  justify-content: center;
`;

const TableButton = styled(Button)`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 25px;
  justify-content: center;
  width: 25px;
`;

const PhoneContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
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

  const spanPhones = () => (
    phoneNumbers.map((phone) => (
      <PhoneContainer key={phone.id}>
        <span>
          { phone.phoneNumber }
        </span>
        {phone.whatsapp && (<Whatsapp />)}
      </PhoneContainer>
    )));

  return (
    <tr>
      <td>{ fullName }</td>
      <td>
        {spanPhones()}
        <TableButton>+</TableButton>
      </td>
      <td>
        <span>
          { emails.length > 0 && emails[0].email }
        </span>
        <TableButton>+</TableButton>
      </td>
      <ButtonTD>
        <TableButton type="button" onClick={handleClick}>X</TableButton>
      </ButtonTD>
    </tr>
  );
}
