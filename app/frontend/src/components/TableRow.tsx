import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createEmail, createPhone, deleteContact } from '../helpers/api';
import IContact from '../interfaces/IContact';
import Button from '../styles/Button';
import Input from '../styles/Input';
import EmailContainer from './EmailContainer';
import PhoneContainer from './PhoneContainer';

interface TableRowProps {
  contact: IContact;
  updateList: () => void;
}

const ButtonTD = styled.td`
  display: flex;
  justify-content: center;
`;

const ListContainer = styled.div`
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

  const [emailInput, setEmailInput] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailBtnDisabled, setEmailBtnDisabled] = useState(true);

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
    const emailRegex = /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/;

    setPhoneBtnDisabled(!phoneRegex.test(newPhone));
    setEmailBtnDisabled(!emailRegex.test(newEmail));
  }, [newPhone, newEmail]);

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
      closePhoneInput();
    }
  };

  const openEmailInput = () => {
    setEmailInput(true);
  };

  const closeEmailInput = () => {
    setEmailInput(false);
    setNewEmail('');
  };

  const addEmail = async () => {
    const done = await createEmail({ email: newEmail, ownerId: id });
    if (done) {
      updateList();
      setNewEmail('');
      closeEmailInput();
    }
  };

  const removeContact = async () => {
    await deleteContact(id);
    updateList();
  };

  const spanPhones = () => (
    phoneNumbers.map((phone) => (
      <PhoneContainer phone={phone} key={phone.id} updateList={updateList} />
    )));

  const spanEmails = () => (
    emails.map((email) => (
      <EmailContainer email={email} key={email.id} updateList={updateList} />
    )));

  return (
    <tr>
      <td data-testid={`contact-name-${id}`}>{ fullName }</td>
      <td>
        <ListContainer>
          {spanPhones()}
          {phoneInput ? (
            <InputContainer>
              <TableInput type="text" placeholder="+55999999999" value={newPhone} onChange={({ target }) => setNewPhone(target.value)} />
              <ConfirmButton
                disabled={phoneBtnDisabled}
                onClick={addPhone}
                data-testid={`phone-add-confirm-button-${id}`}
              >
                V
              </ConfirmButton>
              <CancelButton data-testid={`phone-add-cancel-button-${id}`} onClick={closePhoneInput}>X</CancelButton>
            </InputContainer>
          ) : <TableButton data-testid={`phone-add-button-${id}`} onClick={openPhoneInput}>+</TableButton>}
        </ListContainer>
      </td>
      <td>
        <ListContainer>
          {spanEmails()}
          {emailInput ? (
            <InputContainer>
              <TableInput type="text" placeholder="email@email.com" value={newEmail} onChange={({ target }) => setNewEmail(target.value)} />
              <ConfirmButton
                disabled={emailBtnDisabled}
                onClick={addEmail}
                data-testid={`email-add-confirm-button-${id}`}
              >
                V
              </ConfirmButton>
              <CancelButton data-testid={`email-add-cancel-button-${id}`} onClick={closeEmailInput}>X</CancelButton>
            </InputContainer>
          ) : <TableButton data-testid={`email-add-button-${id}`} onClick={openEmailInput}>+</TableButton>}
        </ListContainer>
      </td>
      <ButtonTD>
        <TableButton data-testid={`contact-remove-button-${id}`} type="button" onClick={removeContact}>X</TableButton>
      </ButtonTD>
    </tr>
  );
}
