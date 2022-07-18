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
  describe('when whatsapp is true', () => {
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

    it('remove button click should call the expected functions', async () => {
      mockDeletePhone.mockResolvedValue();

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const removeBtn = screen.getByRole('button', { name: /remove/i });

      await act(async () => userEvent.click(removeBtn));

      expect(mockDeletePhone).toHaveBeenCalledTimes(1);
      expect(mockUpdateList).toHaveBeenCalledTimes(1);
    });

    it('edit button click should call the expected functions when phone input has a different valid phone', async () => {
      mockPatchPhone.mockResolvedValue(true);

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
      const editBtn = screen.getByRole('button', { name: /edit/i });

      expect(editBtn).toBeDisabled();

      userEvent.type(phoneInput, '+552687');

      expect(editBtn).not.toBeDisabled();

      await act(async () => userEvent.click(editBtn));

      expect(mockPatchPhone).toHaveBeenCalledTimes(1);
      expect(mockUpdateList).toHaveBeenCalledTimes(1);
    });

    describe('edit button click should call patchPhone with expected params', () => {
      beforeEach(() => {
        mockPatchPhone.mockResolvedValue(true);
      });

      it('when just phone is changed', async () => {
        const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

        userEvent.click(menuBtn);

        const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
        const editBtn = screen.getByRole('button', { name: /edit/i });

        userEvent.type(phoneInput, '+552687');

        await act(async () => userEvent.click(editBtn));

        expect(mockPatchPhone).toBeCalledWith(
          mockedPhone.id,
          {
            phoneNumber: '+552687',
            whatsapp: undefined,
          },
        );
      });

      it('when just whatsapp is changed', async () => {
        const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

        userEvent.click(menuBtn);

        const editBtn = screen.getByRole('button', { name: /edit/i });
        const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);

        userEvent.selectOptions(whatsappSelect, 'no');

        await act(async () => userEvent.click(editBtn));

        expect(mockPatchPhone).toBeCalledWith(
          mockedPhone.id,
          {
            phoneNumber: undefined,
            whatsapp: false,
          },
        );
      });

      it('when phone number and whatsapp are changed', async () => {
        const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

        userEvent.click(menuBtn);

        const editBtn = screen.getByRole('button', { name: /edit/i });
        const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
        const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);

        userEvent.type(phoneInput, '+552687');
        userEvent.selectOptions(whatsappSelect, 'no');

        await act(async () => userEvent.click(editBtn));

        expect(mockPatchPhone).toBeCalledWith(
          mockedPhone.id,
          {
            phoneNumber: '+552687',
            whatsapp: false,
          },
        );
      });
    });

    it('edit button should stay disabled when whatsapp select and phone input have not different values', async () => {
      mockPatchPhone.mockResolvedValue(true);

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
      const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);
      const editBtn = screen.getByRole('button', { name: /edit/i });

      expect(editBtn).toBeDisabled();

      userEvent.selectOptions(whatsappSelect, 'yes');
      userEvent.type(phoneInput, '+55222222');

      expect(editBtn).toBeDisabled();
    });

    it('edit button click should call the expected functions when whatsapp select has a different value', async () => {
      mockPatchPhone.mockResolvedValue(true);

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);
      const editBtn = screen.getByRole('button', { name: /edit/i });

      expect(editBtn).toBeDisabled();

      userEvent.selectOptions(whatsappSelect, 'no');

      expect(editBtn).not.toBeDisabled();

      await act(async () => userEvent.click(editBtn));

      expect(mockPatchPhone).toHaveBeenCalledTimes(1);
      expect(mockUpdateList).toHaveBeenCalledTimes(1);
    });

    it('edit button click should hide menu when phone input has a different valid phone', async () => {
      mockPatchPhone.mockResolvedValue(true);

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
      const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);
      const removeBtn = screen.getByRole('button', { name: /remove/i });
      const editBtn = screen.getByRole('button', { name: /edit/i });
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });

      userEvent.type(phoneInput, '+552687');

      await act(async () => userEvent.click(editBtn));

      expect(phoneInput).not.toBeInTheDocument();
      expect(whatsappSelect).not.toBeInTheDocument();
      expect(removeBtn).not.toBeInTheDocument();
      expect(editBtn).not.toBeInTheDocument();
      expect(cancelBtn).not.toBeInTheDocument();
    });

    it('edit button click should not hide menu when there is an error in request', async () => {
      mockPatchPhone.mockResolvedValue(false);

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
      const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);
      const removeBtn = screen.getByRole('button', { name: /remove/i });
      const editBtn = screen.getByRole('button', { name: /edit/i });
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });

      userEvent.type(phoneInput, '+552687');

      await act(async () => userEvent.click(editBtn));

      expect(phoneInput).toBeInTheDocument();
      expect(whatsappSelect).toBeInTheDocument();
      expect(removeBtn).toBeInTheDocument();
      expect(editBtn).toBeInTheDocument();
      expect(cancelBtn).toBeInTheDocument();
    });

    it('cancel button click should hide expected elements', async () => {
      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
      const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);
      const removeBtn = screen.getByRole('button', { name: /remove/i });
      const editBtn = screen.getByRole('button', { name: /edit/i });
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });

      userEvent.click(cancelBtn);

      expect(phoneInput).not.toBeInTheDocument();
      expect(whatsappSelect).not.toBeInTheDocument();
      expect(removeBtn).not.toBeInTheDocument();
      expect(editBtn).not.toBeInTheDocument();
      expect(cancelBtn).not.toBeInTheDocument();
    });
  });

  describe('when whatsapp is false', () => {
    beforeEach(() => {
      render(<PhoneContainer
        updateList={mockUpdateList}
        phone={{ ...mockedPhone, whatsapp: false }}
      />);
    });

    it('edit button should stay disabled when whatsapp select and phone input have not different values', async () => {
      mockPatchPhone.mockResolvedValue(true);

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const phoneInput = screen.getByPlaceholderText(/\+55222222/i);
      const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);
      const editBtn = screen.getByRole('button', { name: /edit/i });

      expect(editBtn).toBeDisabled();

      userEvent.selectOptions(whatsappSelect, 'no');
      userEvent.type(phoneInput, '+55222222');

      expect(editBtn).toBeDisabled();
    });

    it('edit button click should call the expected functions when whatsapp select has a different value', async () => {
      mockPatchPhone.mockResolvedValue(true);

      const menuBtn = screen.getByRole('button', { name: /\.\.\./i });

      userEvent.click(menuBtn);

      const whatsappSelect = screen.getByTestId(`whatsapp-select-${mockedPhone.id}`);
      const editBtn = screen.getByRole('button', { name: /edit/i });

      expect(editBtn).toBeDisabled();

      userEvent.selectOptions(whatsappSelect, 'yes');

      expect(editBtn).not.toBeDisabled();

      await act(async () => userEvent.click(editBtn));

      expect(mockPatchPhone).toHaveBeenCalledTimes(1);
      expect(mockUpdateList).toHaveBeenCalledTimes(1);
    });
  });
});
