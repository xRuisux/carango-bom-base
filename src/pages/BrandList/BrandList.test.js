import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router, useLocation } from 'react-router-dom';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandList from './BrandList';
import BrandService from '../../services/BrandService';

describe('<BrandList />', () => {
  it('Should render the component', async () => {
    localStorage.setItem('token', 'testtoken');
    BrandService.list = jest.fn(() => Promise.resolve([{ "id": 74, "name": "CHEVROLET" }, { "id": 34, "name": "FORD" }]));
    await act(async () =>
      render(
        <BrandList />
      )
    );

    const deleteBtn = screen.getByRole('button', { name: 'Excluir' });
    const updateBtn = screen.getByRole('button', { name: 'Alterar' });
    const createBtn = screen.getByRole('button', { name: 'Adicionar' });

    expect(createBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
  });

  it('Should redirect to "create-brand" when press "Adicionar" button', async () => {
    const history = createMemoryHistory();
    localStorage.setItem('token', 'testtoken');
    BrandService.list = jest.fn(() => Promise.resolve([{ "id": 74, "name": "CHEVROLET" }, { "id": 34, "name": "FORD" }]));
     act(async () =>
      render(
        <MemoryRouter history={history}>
          <BrandList />
          <LocationDisplay />
        </MemoryRouter>
      )
    );

    const createBtn = screen.getByRole('button', { name: /Adicionar/i });
    userEvent.click(createBtn);
    expect(screen.getByTestId('location-display')).toHaveTextContent('/create-brand');
  });

  it('Should redirect to brand update route when user click on "Alterar" button', async () => {
    const history = createMemoryHistory();
    localStorage.setItem('token', 'testtoken');
    BrandService.list = jest.fn(() => Promise.resolve([{ "id": 74, "name": "CHEVROLET" }, { "id": 34, "name": "FORD" }]));
    await act(async () =>
      render(
        <MemoryRouter history={history}>
          <BrandList />
          <LocationDisplay />
        </MemoryRouter>

      )
    );

    const updateBtn = screen.getByRole('button', { name: /Alterar/i });
    const brandSelected = await screen.findByText("CHEVROLET");
    userEvent.click(brandSelected);
    userEvent.click(updateBtn);

    expect(screen.getByTestId('location-display')).toHaveTextContent('/update-brand/74');
  });

  it('Should delete item', async () => {
    localStorage.setItem('token', 'testtoken');
    BrandService.list = jest.fn(() => Promise.resolve([{ "id": 74, "name": "CHEVROLET" }, { "id": 34, "name": "FORD" }]));
    BrandService.delete = jest.fn(() => Promise.resolve());

    await act(async () =>
      render(
        <BrandList />
      )
    );
    await waitFor(() => screen.getByText('CHEVROLET'));

    const deleteBtn = screen.getByRole('button', { name: /Excluir/i });
    const brandSelected = await screen.findByText("CHEVROLET");
    userEvent.click(brandSelected);
    userEvent.click(deleteBtn);
    userEvent.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(BrandService.delete).toHaveBeenCalledWith({ "id": 74, "name": "CHEVROLET" });
  });

  it('Should render list lines', async () => {
    localStorage.setItem('token', 'testtoken');
    BrandService.list = jest.fn(() => Promise.resolve([{ "id": 74, "name": "CHEVROLET" }, { "id": 34, "name": "FORD" }]));
    await act(async () =>
      render(
        <BrandList />
      )
    );

    expect(await screen.findByText("CHEVROLET")).toBeInTheDocument();
  });
});

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>
}