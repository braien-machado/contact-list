import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { getContacts } from '../helpers/api';
import App from '../App';
import mockedContacts from './mocks/contact';

jest.mock('../helpers/api');

const mockGetContacts = getContacts as jest.MockedFunction<typeof getContacts>;

describe('App', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when there is no contact', () => {
    it('should render the expected message', async () => {
      mockGetContacts.mockResolvedValue([]);
      await act(async () => {
        render(<App />);
      });

      const message = screen.getByText(/you have not registered any contacts yet\./i);

      expect(message).toBeInTheDocument();
    });
  });

  describe('when there are contacts', () => {
    it('should not render the expected message', async () => {
      mockGetContacts.mockResolvedValue(mockedContacts);
      await act(async () => {
        render(<App />);
      });

      const message = screen.queryByText(/you have not registered any contacts yet\./i);

      expect(message).not.toBeInTheDocument();
    });
  });

  describe('loader', () => {
    it('should not render without interaction', async () => {
      mockGetContacts.mockResolvedValue(mockedContacts);
      await act(async () => {
        render(<App />);
      });

      const loader = screen.queryByTestId('loader-component');

      expect(loader).not.toBeInTheDocument();
    });
  });
});
