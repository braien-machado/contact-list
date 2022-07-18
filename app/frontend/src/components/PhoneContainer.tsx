import React, { useEffect, useState } from 'react';
import { deletePhone, patchPhone } from '../helpers/api';
import IPhone from '../interfaces/IPhone';
import InfoContainer from '../styles/InfoContainer';
import Input from '../styles/Input';
import Whatsapp from './WhatsappIcon';

interface PhoneProps {
  phone: IPhone;
  updateList: () => void;
}

export default function PhoneContainer(props: PhoneProps) {
  const { phone, updateList } = props;
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [editDisabled, setEditDisabled] = useState(true);
  const [updatedPhone, setUpdatedPhone] = useState({ phoneNumber: '', whatsapp: phone.whatsapp });

  useEffect(() => {
    const phoneRegex = /^\+[1-9][0-9]\d{1,14}$/;
    const { phoneNumber, whatsapp } = updatedPhone;

    setEditDisabled(
      (!phoneRegex.test(phoneNumber) || phoneNumber === phone.phoneNumber)
      && whatsapp === phone.whatsapp,
    );
  }, [phone.phoneNumber, phone.whatsapp, updatedPhone]);

  const removePhone = async () => {
    await deletePhone(phone.id);
    updateList();
  };

  const editPhone = async () => {
    const { phoneNumber, whatsapp } = updatedPhone;
    const done = await patchPhone(
      phone.id,
      {
        phoneNumber: phoneNumber === phone.phoneNumber ? undefined : phoneNumber,
        whatsapp: whatsapp === phone.whatsapp ? undefined : whatsapp,
      },
    );

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
            <span data-testid={`phone-span-${phone.id}`}>
              { phone.phoneNumber }
            </span>
            {phone.whatsapp && (<Whatsapp />)}
            <button data-testid={`phone-menu-button-${phone.id}`} type="button" onClick={() => setIsMenuHidden(false)}>...</button>
          </>
        ) : (
          <>
            <Input type="text" data-testid={`phone-input-${phone.id}`} placeholder={phone.phoneNumber} onChange={({ target }) => setUpdatedPhone({ ...updatedPhone, phoneNumber: target.value })} />
            <label htmlFor="wpp-select">
              whatsapp
              <select
                data-testid={`whatsapp-select-${phone.id}`}
                name="whatsapp-value"
                id="wpp-select"
                defaultValue={phone.whatsapp ? 1 : 0}
                onChange={({ target }) => {
                  setUpdatedPhone({ ...updatedPhone, whatsapp: Boolean(Number(target.value)) });
                }}
              >
                option
                <option value={1}>yes</option>
                <option value={0}>no</option>
              </select>
            </label>
            <div>
              <button type="button" disabled={editDisabled} onClick={editPhone}>Edit</button>
              <button type="button" onClick={removePhone}>Remove</button>
              <button type="button" onClick={() => setIsMenuHidden(true)}>Cancel</button>
            </div>
          </>
        )
      }
    </InfoContainer>
  );
}
