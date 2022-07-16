import React from 'react';
import styled from 'styled-components';

const DeleteTHead = styled.th`
  text-align: center;
  width: 65px;
`;

export default function TableHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <DeleteTHead>Remove</DeleteTHead>
      </tr>
    </thead>
  );
}
