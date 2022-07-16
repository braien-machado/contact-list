import React, { useState } from 'react';
import IEmail from '../interfaces/IEmail';
import InfoContainer from '../styles/InfoContainer';

interface EmailProps {
  email: IEmail;
}

export default function EmailContainer(props: EmailProps) {
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  const { email } = props;

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
            <button type="button">Remove</button>
            <button type="button" onClick={() => setIsMenuHidden(true)}>Cancel</button>
          </div>
        )
      }
    </InfoContainer>
  );
}
