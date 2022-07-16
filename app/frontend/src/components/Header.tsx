import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createContact } from '../helpers/api';

const MainHeader = styled.header`
  display: flex;
`;

interface HeaderProps {
  updateList: () => void;
}

export default function Header(props: HeaderProps) {
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { updateList } = props;

  const handleChange = (value: string) => {
    setName(value);
  };

  useEffect(() => {
    setIsDisabled(name.length === 0);
  }, [name]);

  const handleSubmit = async () => {
    await createContact(name);
    updateList();
  };

  return (
    <MainHeader>
      <h1>Contacts</h1>
      <input type="text" placeholder="Name" value={name} onChange={({ target }) => handleChange(target.value)} />
      <button type="button" disabled={isDisabled} onClick={handleSubmit}>Add Contact</button>
    </MainHeader>
  );
}
