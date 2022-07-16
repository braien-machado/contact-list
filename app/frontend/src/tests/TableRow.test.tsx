import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TableRow from '../components/TableRow';
import mockedContacts from './mocks/contact';
import { deleteContact } from '../helpers/api';

jest.mock('../helpers/api');

const mockUpdateList = jest.fn();
const mockDeleteContact = deleteContact as jest.MockedFunction<typeof deleteContact>;

describe('TableRow component', () => {
  it('should render the expected elements', () => {
    render(
      <table>
        <tbody>
          <TableRow updateList={mockUpdateList} contact={mockedContacts[1]} />
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

    const addPhoneInput = screen.queryByPlaceholderText(/\+55999999999/i);
    const confirmPhoneBtn = screen.queryByTestId(`phone-add-confirm-button-${mockedContacts[1].id}`);
    const cancelPhoneBtn = screen.queryByTestId(`phone-add-cancel-button-${mockedContacts[1].id}`);

    const addEmailInput = screen.queryByPlaceholderText(/\+55999999999/i);
    const confirmEmailBtn = screen.queryByTestId(`email-add-confirm-button-${mockedContacts[1].id}`);
    const cancelEmailBtn = screen.queryByTestId(`email-add-cancel-button-${mockedContacts[1].id}`);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(emailMenuBtn).toBeInTheDocument();
    expect(emailAddBtn).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(phoneMenuBtn).toBeInTheDocument();
    expect(phoneAddBtn).toBeInTheDocument();
    expect(contactRemoveBtn).toBeInTheDocument();

    expect(addPhoneInput).not.toBeInTheDocument();
    expect(confirmPhoneBtn).not.toBeInTheDocument();
    expect(cancelPhoneBtn).not.toBeInTheDocument();
    expect(addEmailInput).not.toBeInTheDocument();
    expect(confirmEmailBtn).not.toBeInTheDocument();
    expect(cancelEmailBtn).not.toBeInTheDocument();
  });

  it('remove contact button should call the expected functions', async () => {
    mockDeleteContact.mockResolvedValue();
    render(
      <table>
        <tbody>
          <TableRow updateList={mockUpdateList} contact={mockedContacts[1]} />
        </tbody>
      </table>,
    );

    const contactRemoveBtn = screen.getByTestId(`contact-remove-button-${mockedContacts[1].id}`);

    await act(async () => {
      userEvent.click(contactRemoveBtn);
    });

    expect(mockDeleteContact).toHaveBeenCalledTimes(1);
    expect(mockUpdateList).toHaveBeenCalledTimes(1);
  });

  it('phone add button should render expected elements', async () => {
    render(
      <table>
        <tbody>
          <TableRow updateList={mockUpdateList} contact={mockedContacts[1]} />
        </tbody>
      </table>,
    );

    const addBtn = screen.getByTestId(`phone-add-button-${mockedContacts[1].id}`);

    userEvent.click(addBtn);

    const addInput = screen.getByPlaceholderText(/\+55999999999/i);
    const confirmBtn = screen.getByTestId(`phone-add-confirm-button-${mockedContacts[1].id}`);
    const cancelBtn = screen.getByTestId(`phone-add-cancel-button-${mockedContacts[1].id}`);

    expect(addInput).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });

  it('email add button should render expected elements', async () => {
    render(
      <table>
        <tbody>
          <TableRow updateList={mockUpdateList} contact={mockedContacts[1]} />
        </tbody>
      </table>,
    );

    const addBtn = screen.getByTestId(`email-add-button-${mockedContacts[1].id}`);

    userEvent.click(addBtn);

    const addInput = screen.getByPlaceholderText(/email@email\.com/i);
    const confirmBtn = screen.getByTestId(`email-add-confirm-button-${mockedContacts[1].id}`);
    const cancelBtn = screen.getByTestId(`email-add-cancel-button-${mockedContacts[1].id}`);

    expect(addInput).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });
});
