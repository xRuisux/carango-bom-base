import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { UserList } from "."
import UserService from "../../services/UserService"

beforeEach(async () => {
  const users = [
    { id: 1, email: 'teste1@teste.com', name: 'Admin1', password: '12345'}, 
    { id: 2, email: 'teste2@teste.com', name: 'Admin2', password: '56789'}
  ]
  localStorage.setItem('token', '123token')

  act(async () => {
    UserService.list = jest.fn(() => Promise.resolve({ data: users }))
  })
})

beforeEach(() => { cleanup() })

describe('<UserList />', () => {
  
  it('should render correctly', async () => {
    await act(async () => render(<UserList />))

    expect(screen.queryByRole('button', { name: 'Adicionar' })).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: /excluir/i })).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /alterar/i })).not.toBeInTheDocument()
  })

  it('should display confirm when delete button is clicked', async () => {
    await act(() => render(<UserList />))

    const userRow = await screen.findByRole('cell', { name: /teste1@teste.com/i})
    fireEvent.click(userRow)
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }))
    
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument()
  })

  it('should remove user from table when confirm button is clicked', async () => {

    const user = { id: 1, email: 'teste1@teste.com', name: 'Admin1', password: '12345'}
    UserService.delete = jest.fn(() => Promise.resolve({ data: user }))

    await act(() => render(<UserList />))

    const userRow = await screen.findByRole('cell', { name: /teste1@teste.com/i})
    fireEvent.click(userRow)
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }))
    
    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(userRow).not.toBeInTheDocument()
    expect.not.toBeInTheDocument(screen.getByRole('button', { name: /confirmar/i }))
  })

  it('should not remove user from table when cancel button is clicked', async () => {

    await act(() => render(<UserList />))

    const userRow = await screen.findByRole('cell', { name: /teste1@teste.com/ })
    fireEvent.click(userRow)
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }))
    
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(userRow).toBeInTheDocument()
    expect.not.toBeInTheDocument(screen.getByRole('button', { name: /cancelar/i }))
  })
})