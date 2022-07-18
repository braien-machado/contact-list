import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHead from '../components/TableHead';

jest.mock('../helpers/api');

describe('TableHead component', () => {
  it('should render the expected elements', () => {
    render(<table><TableHead /></table>);
    const nameTableHead = screen.getByRole('columnheader', { name: /name/i });
    const phoneTableHead = screen.getByRole('columnheader', { name: /phone/i });
    const emailTableHead = screen.getByRole('columnheader', { name: /email/i });
    const removeTableHead = screen.getByRole('columnheader', { name: /remove/i });

    expect(nameTableHead).toBeInTheDocument();
    expect(phoneTableHead).toBeInTheDocument();
    expect(emailTableHead).toBeInTheDocument();
    expect(removeTableHead).toBeInTheDocument();
  });
});
