import React from 'react';
import IContact from '../interfaces/IContact';

interface TableRowProps {
  contact: IContact;
}

export default function TableRow(props: TableRowProps) {
  const {
    contact: {
      // id,
      fullName,
      phoneNumbers,
      emails,
    },
  } = props;

  return (
    <tr>
      <td>{ fullName }</td>
      <td>{ phoneNumbers.length > 0 && phoneNumbers[0].phoneNumber }</td>
      <td>{ emails.length > 0 && emails[0].email }</td>
    </tr>
  );
}
