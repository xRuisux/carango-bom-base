import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandService from '../../../services/BrandService';
import BrandRegister from './BrandRegister';

const brandServiceCreateSpy = jest.spyOn(BrandService, 'create');
const brandServiceReadSpy = jest.spyOn(BrandService, 'read');
brandServiceReadSpy.mockResolvedValue({ id: 1, name: 'renaut' });

let testLocation;

const setup = (brandId) => {
  const path = brandId ? '/update-brand/:id' : '/create-brand';
  const entry = brandId ? `/update-brand/${brandId}` : '/create-brand';
    
  return render(
    <MemoryRouter initialEntries={['/brands', entry]} initialIndex={1}>
      <Route path={path}>
        <BrandRegister />
      </Route>
      <Route
        path="*"
        render={({ history, location }) => {
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('BrandRegister tests', () => {
  it('Should show error if brand is not provided', async () => {
    await act(async () => setup());

    const newBrand = '';
    const textBox = screen.getByRole('textbox', { name: /Marca/i });

    textBox.focus();
    userEvent.type(textBox, newBrand);
    textBox.blur();
    const errorMessage = await screen.findByText(
      'A marca deve ter ao menos 3 letras.'
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should redirect to "/brands" when the user press "cadastrar" with valid data', async () => {
    await act(async () => setup());

    const newBrand = 'BMW';
    const textBox = screen.getByRole('textbox', { name: /Marca/i });
    const createBtn = screen.getByRole('button', { name: /Cadastrar/i });
    userEvent.type(textBox, newBrand);
    userEvent.click(createBtn);

    await waitFor(() => expect(testLocation.pathname).toEqual('/brands'));
  });

  it('Should redirect to "/brands" when the user press "cancelar" with valid data', async () => {
    await act(async () => setup());

    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });
    userEvent.click(cancelBtn);

    await waitFor(() => expect(testLocation.pathname).toEqual('/brands'));
  });

  it('should register the brand that is typed into the input', async () => {
    await act(async () => setup());

    const input = screen.getByRole('textbox', { name: /Marca/i });
    userEvent.type(input, 'Fiat');
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /cadastrar/i }))
    );

    expect(brandServiceCreateSpy).toHaveBeenCalledWith({ name: 'Fiat' });
  });

  it('Should redirect to "/brands" when the user press cancel', async () => {
    await act(async () => setup());

    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });
    userEvent.click(cancelBtn);

    expect(testLocation.pathname).toEqual('/brands');
  });
});