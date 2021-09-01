import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { VehicleList } from "."
import { createMemoryHistory } from 'history'
import { Router } from "react-router-dom"
import VehicleService from "../../services/VehicleService"
import BrandService from "../../services/BrandService"

jest.mock('../../services/BrandService', () => jest.fn())
jest.mock('../../services/VehicleService', () => jest.fn())

beforeEach(async () => {
  const vehicles = [{ id: 2, model: 'Civic', year: 2021, brand: 1, price: 6000000 }, { id: 3, model: 'Accord', year: 2020, brand: 1, price: 8000000 }]
  act(async () => {

  BrandService.list = jest.fn(() => Promise.resolve({ data: [{ 'id': 1, 'name': 'Honda'}, { 'id': 2, 'name': 'Toyota'}] }))

  VehicleService.list = jest.fn(() => Promise.resolve({ data: vehicles }))
  })
})

beforeEach(()=>{ cleanup() })

describe('<VehicleList />', () => {
  
  it('should render correctly', () => {
    render(<VehicleList />)

    expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /excluir/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /alterar/i })).toBeInTheDocument()
  })

  it('should go to vehicle form page when add button is clicked', async () => {
    const history = createMemoryHistory()
    history.location.pathname = '/vehicle'

    await act(() => render(<Router history={history}>
            <VehicleList />
          </Router>))

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }))
    
    expect(history.location.pathname).toEqual('/vehicle-form')
  })

  it('should go to vehicle form page when edit button is clicked', async () => {

    const history = createMemoryHistory()
    history.location.pathname = '/vehicle'

    await act(() => render(<Router history={history}>
            <VehicleList />
          </Router>))

    const vehicleRow = await screen.findByRole('cell', { name: /civic/i})
    fireEvent.click(vehicleRow)
    fireEvent.click(screen.getByRole("button", { name: /alterar/i }))
    
    expect(history.location.pathname).toEqual('/vehicle-form')
  })


  it('should display confirm when delete button is clicked', async () => {

    await act(() => render(<VehicleList />))

    const vehicleRow = await screen.findByRole('cell', { name: /civic/i})
    fireEvent.click(vehicleRow)
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }))
    
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument()
  })

  it('should remove vehicle from table when confirm button is clicked', async () => {

    const vehicle = { id: 2, model: 'Civic', year: 2021, brand: 1, price: 6000000 }
    VehicleService.delete = jest.fn(() => Promise.resolve({ data: vehicle }))

    await act(() => render(<VehicleList />))

    const vehicleRow = await screen.findByRole('cell', { name: /civic/i})
    fireEvent.click(vehicleRow)
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }))
    
    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(vehicleRow).not.toBeInTheDocument()
    expect.not.toBeInTheDocument(screen.getByRole('button', { name: /confirmar/i }))
  })

  it('should not remove vehicle from table when cancel button is clicked', async () => {

    await act(() => render(<VehicleList />))

    const vehicleRow = await screen.findByRole('cell', { name: /civic/i})
    fireEvent.click(vehicleRow)
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }))
    
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(vehicleRow).toBeInTheDocument()
    expect.not.toBeInTheDocument(screen.getByRole('button', { name: /cancelar/i }))
  })
})