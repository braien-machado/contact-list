import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPhone, deleteContact } from '../helpers/api';
import IContact from '../interfaces/IContact';
import Button from '../styles/Button';
import Input from '../styles/Input';
import Whatsapp from './WhatsappIcon';
import Check from './CheckIcon';

interface TableRowProps {
  contact: IContact;
  updateList: () => void;
}

const ButtonTD = styled.td`
  display: flex;
  justify-content: center;
`;

const PhonesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TableButton = styled(Button)`
  align-items: center;
  border-radius: 50%;
  border: none;
  display: flex;
  height: 25px;
  justify-content: center;
  width: 25px;
`;

const CancelButton = styled(TableButton)`
  background-color: #c26060;

  &:hover {
    background-color: #bd3737;
  }
`;

const ConfirmButton = styled(TableButton)`
  background-color: #83b383;

  &:hover {
    background-color: #42a342;
  }

  &:disabled {
    background-color: #acacac;
    border-color: #acacac;
    cursor: default;
  }
`;

const PhoneContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
`;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
`;

const TableInput = styled(Input)`
  width: 150px;
`;

export default function TableRow(props: TableRowProps) {
  const [phoneInput, setPhoneInput] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [phoneBtnDisabled, setPhoneBtnDisabled] = useState(true);

  const {
    contact: {
      id,
      fullName,
      phoneNumbers,
      emails,
    },
    updateList,
  } = props;

  useEffect(() => {
    const phoneRegex = /^\+[1-9][0-9]\d{1,14}$/;

    setPhoneBtnDisabled(!phoneRegex.test(newPhone));
  }, [newPhone]);

  const openPhoneInput = () => {
    setPhoneInput(true);
  };

  const closePhoneInput = () => {
    setPhoneInput(false);
    setNewPhone('');
  };

  const addPhone = async () => {
    const done = await createPhone({ phoneNumber: newPhone, ownerId: id });
    if (done) {
      updateList();
      setNewPhone('');
    }
  };

  const handleDelete = async () => {
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
        <PhonesContainer>
          {spanPhones()}
          {phoneInput ? (
            <InputContainer>
              <TableInput type="text" placeholder="+55999999999" value={newPhone} onChange={({ target }) => setNewPhone(target.value)} />
              <ConfirmButton
                disabled={phoneBtnDisabled}
                onClick={addPhone}
              >
                <Check />
              </ConfirmButton>
              <CancelButton onClick={closePhoneInput}>X</CancelButton>
            </InputContainer>
          ) : <TableButton onClick={openPhoneInput}>+</TableButton>}
        </PhonesContainer>
      </td>
      <td>
        <span>
          { emails.length > 0 && emails[0].email }
        </span>
        <TableButton>+</TableButton>
      </td>
      <ButtonTD>
        <TableButton type="button" onClick={handleDelete}>X</TableButton>
      </ButtonTD>
    </tr>
  );
}
