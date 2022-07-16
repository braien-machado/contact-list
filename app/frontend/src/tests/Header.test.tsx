import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createContact } from '../helpers/api';
import Header from '../components/Header';

jest.mock('../helpers/api');

const mockCreateContact = createContact as jest.MockedFunction<typeof createContact>;
const mockUpdateList = jest.fn();

describe('Header component', () => {
  it('should render the expected elements', () => {
    render(<Header updateList={mockUpdateList} />);
    const title = screen.getByRole('heading', { name: /contacts/i });
    const addContactBtn = screen.getByRole('button', { name: /add contact/i });
    const nameInput = screen.getByRole('textbox');

    expect(title).toBeInTheDocument();
    expect(addContactBtn).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveTextContent('');
    expect(addContactBtn).toBeDisabled();
  });

  it('button should be enabled when input is not empty', () => {
    render(<Header updateList={mockUpdateList} />);
    const addContactBtn = screen.getByRole('button', { name: /add contact/i });
    const nameInput = screen.getByRole('textbox');

    expect(nameInput).toHaveTextContent('');
    expect(addContactBtn).toBeDisabled();

    userEvent.type(nameInput, 'name');
    expect(addContactBtn).not.toBeDisabled();
  });

  it('button click should call the expected functions', async () => {
    mockCreateContact.mockResolvedValue();
    render(<Header updateList={mockUpdateList} />);
    const addContactBtn = screen.getByRole('button', { name: /add contact/i });
    const nameInput = screen.getByRole('textbox');

    userEvent.type(nameInput, 'name');
    await act(async () => userEvent.click(addContactBtn));

    expect(mockCreateContact).toHaveBeenCalledTimes(1);
    expect(mockUpdateList).toHaveBeenCalledTimes(1);
  });

  it('after button click, input be empty', async () => {
    mockCreateContact.mockResolvedValue();
    render(<Header updateList={mockUpdateList} />);
    const addContactBtn = screen.getByRole('button', { name: /add contact/i });
    const nameInput = screen.getByRole('textbox');

    userEvent.type(nameInput, 'name');
    await act(async () => userEvent.click(addContactBtn));
    expect(nameInput).toHaveTextContent('');
  });
});
