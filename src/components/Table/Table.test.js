import React from 'react';
import { screen, render, act } from '@testing-library/react';
import Table from './Table';
import userEvent from '@testing-library/user-event';

const brands = [{ id: 1, name: 'BMW' }, {id: 2, name: 'Renaut'}];
const columns = [{ field: 'name', headerName: 'Brand', width: 200 }];
const rowSelectedFunctionMock = jest.fn();

const setup = () =>
  render(
    <Table
      rows={brands}
      columns={columns}
      addItem={() => {}}
      updateItem={() => {}}s
      deleteItem={() => {}}
      selectedItem={null}
      rowSelectedFunction={rowSelectedFunctionMock}
    />
  );

beforeEach(async () => {
  await act(async () => setup());
});

describe('Tests on Table component', () => {
  it('Should render list with buttons', () => {
      const createBtn = screen.getByRole('button', { name: 'Adicionar' });
      const updateBtn = screen.getByRole('button', { name: 'Alterar' });
      const removeBtn = screen.getByRole('button', { name: 'Excluir' });
      
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(createBtn).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
  });

  it('Should render correct text from row', () => {
    expect(screen.getByText('BMW')).toBeInTheDocument();
  });

  it('Should call function when row is selected', () => {
    const rowItem = screen.getByText('Renaut');
    userEvent.click(rowItem);
    expect(rowSelectedFunctionMock).toHaveBeenCalled();
  });
});
