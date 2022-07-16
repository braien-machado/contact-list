import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailContainer from '../components/EmailContainer';
import mockedEmail from './mocks/email';
import { deleteEmail, patchEmail } from '../helpers/api';

jest.mock('../helpers/api');

const mockDeleteEmail = deleteEmail as jest.MockedFunction<typeof deleteEmail>;
const mockPatchEmail = patchEmail as jest.MockedFunction<typeof patchEmail>;
const mockUpdateList = jest.fn();

describe('EmailContainer component', () => {
  it('should not render the expected elements', () => {
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const emailInput = screen.queryByPlaceholderText(/test@test.com/i);
    const removeBtn = screen.queryByRole('button', { name: /remove/i });
    const editBtn = screen.queryByRole('button', { name: /edit/i });
    const cancelBtn = screen.queryByRole('button', { name: /cancel/i });

    expect(emailInput).not.toBeInTheDocument();
    expect(removeBtn).not.toBeInTheDocument();
    expect(editBtn).not.toBeInTheDocument();
    expect(cancelBtn).not.toBeInTheDocument();
  });

  it('menu button click should render the expected elements', () => {
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const email = screen.queryByTestId(`email-span-${mockedEmail.id}`);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

    userEvent.click(menuBtn);

    const emailInput = screen.getByPlaceholderText(/test@test.com/i);
    const removeBtn = screen.getByRole('button', { name: /remove/i });
    const editBtn = screen.getByRole('button', { name: /edit/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });

    expect(email).not.toBeInTheDocument();
    expect(menuBtn).not.toBeInTheDocument();

    expect(emailInput).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });

  it('remove button click should call the expected functions', async () => {
    mockDeleteEmail.mockResolvedValue();
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

    userEvent.click(menuBtn);

    const removeBtn = screen.getByRole('button', { name: /remove/i });

    await act(async () => userEvent.click(removeBtn));

    expect(mockDeleteEmail).toHaveBeenCalledTimes(1);
    expect(mockUpdateList).toHaveBeenCalledTimes(1);
  });

  it('edit button click should call the expected functions when email input has a different valid email', async () => {
    mockPatchEmail.mockResolvedValue(true);
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

    userEvent.click(menuBtn);

    const emailInput = screen.getByPlaceholderText(/test@test.com/i);
    const editBtn = screen.getByRole('button', { name: /edit/i });

    expect(editBtn).toBeDisabled();

    userEvent.type(emailInput, 'test@mail.com');

    expect(editBtn).not.toBeDisabled();

    await act(async () => userEvent.click(editBtn));

    expect(mockPatchEmail).toHaveBeenCalledTimes(1);
    expect(mockUpdateList).toHaveBeenCalledTimes(1);
  });

  it('edit button click should hide menu when email input has a different valid email', async () => {
    mockPatchEmail.mockResolvedValue(true);
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

    userEvent.click(menuBtn);

    const emailInput = screen.getByPlaceholderText(/test@test.com/i);
    const removeBtn = screen.getByRole('button', { name: /remove/i });
    const editBtn = screen.getByRole('button', { name: /edit/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });

    expect(emailInput).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();

    userEvent.type(emailInput, 'test@mail.com');

    await act(async () => userEvent.click(editBtn));

    expect(emailInput).not.toBeInTheDocument();
    expect(removeBtn).not.toBeInTheDocument();
    expect(editBtn).not.toBeInTheDocument();
    expect(cancelBtn).not.toBeInTheDocument();
  });

  it('edit button click should not hide menu when there is an error in request', async () => {
    mockPatchEmail.mockResolvedValue(false);
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

    userEvent.click(menuBtn);

    const emailInput = screen.getByPlaceholderText(/test@test.com/i);
    const removeBtn = screen.getByRole('button', { name: /remove/i });
    const editBtn = screen.getByRole('button', { name: /edit/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });

    expect(emailInput).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();

    userEvent.type(emailInput, 'test@mail.com');

    await act(async () => userEvent.click(editBtn));

    expect(emailInput).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });

  it('cancel button click should hide expected elements', async () => {
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

    userEvent.click(menuBtn);

    const emailInput = screen.getByPlaceholderText(/test@test.com/i);
    const removeBtn = screen.getByRole('button', { name: /remove/i });
    const editBtn = screen.getByRole('button', { name: /edit/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });

    expect(menuBtn).not.toBeInTheDocument();

    expect(emailInput).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();

    userEvent.click(cancelBtn);

    expect(emailInput).not.toBeInTheDocument();
    expect(removeBtn).not.toBeInTheDocument();
    expect(editBtn).not.toBeInTheDocument();
    expect(cancelBtn).not.toBeInTheDocument();
  });
});
