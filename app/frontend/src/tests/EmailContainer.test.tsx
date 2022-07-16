import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailContainer from '../components/EmailContainer';
import mockedEmail from './mocks/email';

jest.mock('../helpers/api');

const mockUpdateList = jest.fn();

describe('EmailContainer component', () => {
  it('should render the expected elements', () => {
    render(<EmailContainer updateList={mockUpdateList} email={mockedEmail} />);
    const email = screen.getByTestId(`email-span-${mockedEmail.id}`);
    const menuBtn = screen.getByRole('button', { name: /\.\.\./i });
    const emailInput = screen.queryByPlaceholderText(/test@test.com/i);
    const removeBtn = screen.queryByRole('button', { name: /remove/i });
    const editBtn = screen.queryByRole('button', { name: /edit/i });
    const cancelBtn = screen.queryByRole('button', { name: /cancel/i });

    expect(email).toBeInTheDocument();
    expect(menuBtn).toBeInTheDocument();

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
});
