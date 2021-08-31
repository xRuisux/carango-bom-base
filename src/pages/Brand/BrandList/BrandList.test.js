import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandList from './BrandList';

const brandsMock = [{ id: 0, name: 'BMW' }];
jest.mock('../../../services/BrandService', () => ({
  list: jest.fn().mockImplementation(() => Promise.resolve(brandsMock)),
  delete: jest.fn().mockResolvedValue(),
}));

describe('BrandList tests:', () => {
  const setup = () =>
    render(
        <BrandList />
    );

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => setup());
  });

  it('Should render the component', async () => {
    const deleteBtn = screen.getByRole('button', { name: 'Excluir' });
    const updateBtn = screen.getByRole('button', { name: 'Alterar' });
    const createBtn = screen.getByRole('button', { name: 'Adicionar' });

    expect(createBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
  });

//   it('Should redirect to "create-brand" when press add button', () => {
//     const createBtn = screen.getByRole('button', { name: /Adicionar/i });
//     userEvent.click(createBtn);
//     expect(history.location.pathname).toBe('/create-brand');
//   });

//   it('Should redirect to brand update route when user click on update button', async () => {
//     const updateBtn = screen.getByRole('button', { name: /Alterar/i });
//     const brandSelected = await screen.findByText(brandsMock[0].name);
//     userEvent.click(brandSelected);
//     userEvent.click(updateBtn);

//     expect(history.location.pathname).toBe(
//       '/update-brand/' + brandsMock[0].id
//     );
//   });

//   it('Should render list lines', async () => {
//     expect(await screen.findByText(brandsMock[0].name)).toBeInTheDocument();
//   });

//   it('Should delete item', async () => {
//     const deleteBtn = screen.getByRole('button', { name: /Excluir/i });
//     const brandSelected = await screen.findByText(brandsMock[0]);
//     userEvent.click(brandSelected);
//     await act(async () => userEvent.click(deleteBtn));

//     expect(brandSelected).not.toBeInTheDocument();
//   });


});