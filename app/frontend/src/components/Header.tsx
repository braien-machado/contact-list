import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createContact } from '../helpers/api';
import Button from '../styles/Button';
import Input from '../styles/Input';

const MainHeader = styled.header`
  border-bottom: 1px solid #e6e6e6;
  color: #844ee7;
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;

  div {
    display: flex;
    gap: 20px;
  }
`;

interface HeaderProps {
  updateList: () => void;
}

export default function Header(props: HeaderProps) {
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { updateList } = props;

  useEffect(() => {
    setIsDisabled(name.length === 0);
  }, [name]);

  const handleSubmit = async () => {
    await createContact(name);
    updateList();
    setName('');
  };

  return (
    <MainHeader>
      <h1>Contacts</h1>
      <div>
        <Input type="text" placeholder="Name" value={name} onChange={({ target }) => setName(target.value)} />
        <Button type="button" disabled={isDisabled} onClick={handleSubmit}>Add Contact</Button>
      </div>
    </MainHeader>
  );
}
