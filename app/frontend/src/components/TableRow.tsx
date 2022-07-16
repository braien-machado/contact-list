import React from 'react';
import { deleteContact } from '../helpers/api';
import IContact from '../interfaces/IContact';

interface TableRowProps {
  contact: IContact;
  updateList: () => void;
}

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
      <td>
        <button type="button" onClick={handleClick}>Excluir</button>
      </td>
    </tr>
  );
}
