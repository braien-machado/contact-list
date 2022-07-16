import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createContact } from '../helpers/api';

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

  input {
    border: 1px solid #e6e6e6;
    padding: 5px;
    border-radius: 5px;
  }

  input:focus {
    outline-color: #844ee7;
  }

  button {
    background-color: #844ee7;
    border-radius: 5px;
    border: 1px solid #844ee7;
    color: white;
    font-weight: bold;
    padding: 0 10px;
  }

  button:hover {
    background-color: #7443ce;
    border-color: #7443ce;
    cursor: pointer;
    transition-duration: 300ms;
  }

  button:disabled {
    background-color: #acacac;
    border-color: #acacac;
  }
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
    setName('');
  };

  return (
    <MainHeader>
      <h1>Contacts</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={({ target }) => handleChange(target.value)} />
        <button type="button" disabled={isDisabled} onClick={handleSubmit}>Add Contact</button>
      </div>
    </MainHeader>
  );
}
