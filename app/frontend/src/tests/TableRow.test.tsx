import React from 'react';
import { render, screen } from '@testing-library/react';
import TableRow from '../components/TableRow';
import mockedContacts from './mocks/contact';

const mockedUpdateList = jest.fn();

describe('TableRow component', () => {
  it('should render the expected elements', () => {
    render(
      <table>
        <tbody>
          <TableRow updateList={mockedUpdateList} contact={mockedContacts[1]} />
        </tbody>
      </table>,
    );

    const name = screen.getByTestId(`contact-name-${mockedContacts[1].id}`);
    const email = screen.getByTestId(`email-span-${mockedContacts[1].emails[0].id}`);
    const emailMenuBtn = screen.getByTestId(`email-menu-button-${mockedContacts[1].emails[0].id}`);
    const emailAddBtn = screen.getByTestId(`email-add-button-${mockedContacts[1].id}`);
    const phone = screen.getByTestId(`phone-span-${mockedContacts[1].phoneNumbers[0].id}`);
    const phoneMenuBtn = screen.getByTestId(`phone-menu-button-${mockedContacts[1].phoneNumbers[0].id}`);
    const phoneAddBtn = screen.getByTestId(`phone-add-button-${mockedContacts[1].id}`);
    const contactRemoveBtn = screen.getByTestId(`contact-remove-button-${mockedContacts[1].id}`);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(emailMenuBtn).toBeInTheDocument();
    expect(emailAddBtn).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(phoneMenuBtn).toBeInTheDocument();
    expect(phoneAddBtn).toBeInTheDocument();
    expect(contactRemoveBtn).toBeInTheDocument();
  });
});
