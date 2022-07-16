import React from 'react';
import styled from 'styled-components';

const PhoneTHead = styled.th`
  text-align: center;
  width: 250px;
`;

const DeleteTHead = styled.th`
  text-align: center;
  width: 65px;
`;

export default function TableHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <PhoneTHead>Phone</PhoneTHead>
        <th>Email</th>
        <DeleteTHead>Remove</DeleteTHead>
      </tr>
    </thead>
  );
}
