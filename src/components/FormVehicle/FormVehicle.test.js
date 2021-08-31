import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import { Router } from "react-router-dom"
import BrandService from "../../services/BrandService"
import VehicleService from "../../services/VehicleService"
import { renderWithRouter } from "../../utils/renderWithRouter"
import { FormVehicle } from "./FormVehicle"

jest.mock('../../services/BrandService', () => jest.fn())
jest.mock('../../services/VehicleService', () => jest.fn())

beforeAll(() => jest.spyOn(window, 'fetch'))

let mockStorage = {}

beforeAll(() => {
  global.Storage.prototype.removeItem = jest.fn((key) => {
    delete mockStorage[key]
  })
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key])
})


beforeEach(() => BrandService.list = jest.fn(() => Promise.resolve({ data: [{ 'id': 1, 'name': 'Honda'}, { 'id': 2, 'name': 'Toyota'}] })))

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
    BrandService.list = jest.fn(() => Promise.resolve({ data: brands }))

    const history = createMemoryHistory()
    history.location.pathname = '/vehicle'

    // act(async () => await render(<FormVehicle />))
    await act(async () => render(<Router history={history}>
        <FormVehicle />
      </Router>))
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
      expect(history.location.pathname).toEqual('/vehicle')
    })

  })

  it('should call create on form submission', async () => {

    const vehicle = { id: 2, model: 'Civic', brand: 1, price: 6000000 }

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
    fireEvent.click(select)
    userEvent.click(screen.getByRole('option', { name: /honda/i }))
    
    fireEvent.change(inputYear, { target: { value: 2020 }})
    fireEvent.change(inputModel, { target: { value: 'Civic' }})
    fireEvent.change(inputPrice, { target: { value: '6000000' }})
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
    })
    
    expect(VehicleService.create).toHaveBeenCalled()
    expect(history.location.pathname).toEqual('/vehicle')
    expect(mockStorage['vehicle']).toBeFalsy()
  })
})