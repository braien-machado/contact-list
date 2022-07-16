import React, { useEffect, useState } from 'react';
import { deleteEmail, patchEmail } from '../helpers/api';
import IEmail from '../interfaces/IEmail';
import InfoContainer from '../styles/InfoContainer';
import Input from '../styles/Input';

interface EmailProps {
  email: IEmail;
  updateList: () => void;
}

export default function EmailContainer(props: EmailProps) {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [editDisabled, setEditDisabled] = useState(true);
  const [updatedEmail, setUpdatedEmail] = useState('');

  const { email, updateList } = props;

  useEffect(() => {
    const emailRegex = /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/;

    setEditDisabled(!emailRegex.test(updatedEmail) || updatedEmail === email.email);
  }, [email.email, updatedEmail]);

  const removeEmail = async () => {
    await deleteEmail(email.id);
    updateList();
  };

  const editEmail = async () => {
    const done = await patchEmail(email.id, updatedEmail);

    if (done) {
      setIsMenuHidden(true);
      updateList();
    }
  };

  return (
    <InfoContainer>
      {
        isMenuHidden ? (
          <>
            <span data-testid={`email-span-${email.id}`}>
              { email.email }
            </span>
            <button type="button" onClick={() => setIsMenuHidden(false)}>...</button>
          </>
        ) : (
          <>
            <Input type="text" data-testid={`email-input-${email.id}`} placeholder={email.email} onChange={({ target }) => setUpdatedEmail(target.value)} />
            <div>
              <button type="button" disabled={editDisabled} onClick={editEmail}>Edit</button>
              <button type="button" onClick={removeEmail}>Remove</button>
              <button type="button" onClick={() => setIsMenuHidden(true)}>Cancel</button>
            </div>
          </>
        )
      }
    </InfoContainer>
  );
}
