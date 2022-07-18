import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhoneContainer from '../components/PhoneContainer';
import mockedPhone from './mocks/phone';
import { deletePhone, patchPhone } from '../helpers/api';

jest.mock('../helpers/api');

const mockDeletePhone = deletePhone as jest.MockedFunction<typeof deletePhone>;
const mockPatchPhone = patchPhone as jest.MockedFunction<typeof patchPhone>;
const mockUpdateList = jest.fn();

describe('PhoneContainer component', () => {
  beforeEach(() => {
    render(<PhoneContainer updateList={mockUpdateList} phone={mockedPhone} />);
  });

  it('should not render the expected elements', () => {
    const phoneInput = screen.queryByPlaceholderText(/\+55222222/i);
    const whatsappSelect = screen.queryByTestId(`whatsapp-select-${mockedPhone.id}`);
    const removeBtn = screen.queryByRole('button', { name: /remove/i });
    const editBtn = screen.queryByRole('button', { name: /edit/i });
    const cancelBtn = screen.queryByRole('button', { name: /cancel/i });

    expect(phoneInput).not.toBeInTheDocument();
    expect(whatsappSelect).not.toBeInTheDocument();
    expect(removeBtn).not.toBeInTheDocument();
    expect(editBtn).not.toBeInTheDocument();
    expect(cancelBtn).not.toBeInTheDocument();
  });

  it('menu button click should render the expected elements', () => {
    const phone = screen.queryByTestId(`phone-span-${mockedPhone.id}`);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

    userEvent.click(menuBtn);

    const phoneInput = screen.queryByPlaceholderText(/\+55222222/i);
    const whatsappSelect = screen.queryByTestId(`whatsapp-select-${mockedPhone.id}`);
    const removeBtn = screen.queryByRole('button', { name: /remove/i });
    const editBtn = screen.queryByRole('button', { name: /edit/i });
    const cancelBtn = screen.queryByRole('button', { name: /cancel/i });

    expect(phone).not.toBeInTheDocument();
    expect(menuBtn).not.toBeInTheDocument();

    expect(phoneInput).toBeInTheDocument();
    expect(whatsappSelect).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });
});
