import { act, findByText, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import { Router } from "react-router-dom"
import BrandService from "../../services/BrandService"
import VehicleService from "../../services/VehicleService"
import { FormVehicle } from "./FormVehicle"

jest.mock('../../services/BrandService', () => jest.fn())
jest.mock('../../services/VehicleService', () => jest.fn())

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

global.localStorage = localStorageMock

beforeEach(() => BrandService.list = jest.fn(() => Promise.resolve([{ 'id': 1, 'name': 'Honda'}, { 'id': 2, 'name': 'Toyota'}] )))

describe('<FormVehicle />', () => {

  it('renders correctly', () => {
    render(<FormVehicle />)

    const confirmBtn = screen.getByRole("button", { name: /cadastrar/i })
    
    expect(screen.getByLabelText(/modelo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ano/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/marca/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument()
    expect(confirmBtn).toBeInTheDocument()
    expect(confirmBtn).toHaveAttribute('type', 'submit')
  })

  it('should not create vehicle', async () => {
    const brands = [{ 'id': 1, 'name': 'Honda'}, { 'id': 2, 'name': 'Toyota'}]
    BrandService.list = jest.fn(() => Promise.resolve(brands))

    const history = createMemoryHistory()
    history.location.pathname = '/vehicle'

    await act(async () => render(<Router history={history}>
        <FormVehicle />
      </Router>))
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
      expect(history.location.pathname).toEqual('/vehicle')
    })
  })

  it('should call create on form submission', async () => {

    const vehicle = { id: 2, model: 'Civic', year: 2021, brand: 1, price: 6000000 }

    VehicleService.create = jest.fn(() => Promise.resolve(vehicle))
    
    const history = createMemoryHistory()
    history.location.pathname = '/vehicle-form'
    
    await act(async () => render(<Router history={history}>
          <FormVehicle />
         </Router>))

    const inputYear = screen.getByLabelText(/ano/i)
    const inputModel  = screen.getByLabelText(/modelo/i)
    const inputPrice = screen.getByLabelText(/valor/i)
    const selectBrand = screen.getByTestId('wrapper')

    await waitFor(() => userEvent.click(selectBrand), { timeout: 1000 })
    
    const select = within(selectBrand).getByTestId('select')
    
    fireEvent.change(select, { target: { value: 1 }})
    
    fireEvent.change(inputYear, { target: { value: 2020 }})
    fireEvent.change(inputModel, { target: { value: 'Civic' }})
    fireEvent.change(inputPrice, { target: { value: '6000000' }})
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
    })
    
    expect(VehicleService.create).toHaveBeenCalled()
    expect(history.location.pathname).toEqual('/vehicle')
    expect(localStorage.getItem('vehicle')).toBeFalsy()
  })

  it('should load vehicle from localStorage to be edited', async () => {
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
      format: jest.fn(() => '60.000,00')
    }))

    const vehicle = { id: 2, model: 'Civic', year: 2021, brand: 1, price: 6000000 }
    localStorage.setItem('vehicle', JSON.stringify(vehicle))
    
    const history = createMemoryHistory()
    history.location.pathname = '/vehicle-form'

    await act(async () => render(<FormVehicle />))

    const inputYear = screen.getByLabelText(/ano/i)
    const inputModel  = screen.getByLabelText(/modelo/i)
    const inputPrice = screen.getByLabelText(/valor/i)
    const selectBrand = screen.getByTestId('wrapper')

    expect(inputYear).toHaveValue(2021)
    expect(inputModel).toHaveValue('Civic')
    expect(inputPrice).toHaveValue('60.000,00')
    const select = within(selectBrand).getByTestId('select')
    expect(select).toHaveValue('1')
  })


  it('should call edit on form submission', async () => {
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
      format: jest.fn(() => '60.000,00')
    }))

    const vehicle = { id: 2, model: 'Civic', year: 2021, brand: 1, price: 6000000 }
    localStorage.setItem('vehicle', JSON.stringify(vehicle))

    const { brand,  id, ...rest } = vehicle
    const editedVehicle = { ...rest, brandId: brand, model: 'HR-V' }
    VehicleService.edit = jest.fn(() => Promise.resolve(editedVehicle))
    
    const history = createMemoryHistory()
    history.location.pathname = '/vehicle-form'
    
    await act(async () => render(<Router history={history}>
          <FormVehicle />
         </Router>))
         
    fireEvent.change(screen.getByLabelText(/modelo/i), { target: { value: 'HR-V' }})
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /editar/i }))
    })
    
    expect(VehicleService.edit).toHaveBeenCalled()
    expect(VehicleService.edit).toHaveBeenCalledWith(id, editedVehicle)
    expect(history.location.pathname).toEqual('/vehicle')
    expect(localStorage.getItem('vehicle')).toBeFalsy()
  })

  it('should display validation message', async () => {
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
      format: jest.fn(() => '0,00')
    }))
    
    render(<FormVehicle />)

    const selectBrand = screen.getByTestId('wrapper')

    await waitFor(() => userEvent.click(selectBrand), { timeout: 1000 })
    
    const select = within(selectBrand).getByTestId('select')
    fireEvent.change(select, { target: { value: 1 }})
    fireEvent.change(select, { target: { value: '' }})
    fireEvent.blur(select)

    fireEvent.change(screen.getByLabelText(/ano/i), { target: { value: 123 }})
    const yearMsg = await screen.findByText('Insira um ano maior ou igual a 1979')
    
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: 0 }})
    const priceMsg = await screen.findByText('Insira o preço')
    
    fireEvent.change(screen.getByLabelText(/modelo/i), { target: { value: '  ' }})
    const modelMsg = await screen.findByText('Insira um modelo')
    
    expect(yearMsg).toBeInTheDocument()
    expect(priceMsg).toBeInTheDocument()
    expect(modelMsg).toBeInTheDocument()
    expect(screen.getByText('Selecione uma marca')).toBeInTheDocument()
  })
})