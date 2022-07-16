import React, { useState } from 'react';
import { deleteEmail } from '../helpers/api';
import IEmail from '../interfaces/IEmail';
import InfoContainer from '../styles/InfoContainer';

interface EmailProps {
  email: IEmail;
  updateList: () => void;
}

export default function EmailContainer(props: EmailProps) {
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  const { email, updateList } = props;

  const removeEmail = async () => {
    await deleteEmail(email.id);
    updateList();
  };

  return (
    <InfoContainer>
      <span>
        { email.email }
      </span>
      {
        isMenuHidden ? (
          <button type="button" onClick={() => setIsMenuHidden(false)}>...</button>
        ) : (
          <div>
            <button type="button">Edit</button>
            <button type="button" onClick={removeEmail}>Remove</button>
            <button type="button" onClick={() => setIsMenuHidden(true)}>Cancel</button>
          </div>
        )
      }
    </InfoContainer>
  );
}
