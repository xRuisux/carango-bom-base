import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Router } from "react-router-dom"
import { createMemoryHistory } from 'history'

import Login from "."
import LoginService from "../../services/LoginService"
import { AuthProvider } from "../../hooks/useAuth"

jest.mock("../../services/LoginService")

describe('<Login />', () => {
  it('renders correctly', () => {

    render(<Login />)

    const inputPassword = screen.getByLabelText(/senha/i)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    expect(inputPassword).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should display invalid email message', async () => {
    render(<Login />)

    const userInput = screen.getByLabelText(/usuário/i)
    fireEvent.change(userInput, { target: { value: 'amanda.com' } })

    await waitFor(() => {
      const errorEmail = screen.getByText('Insira um email válido')
      expect(errorEmail).toBeInTheDocument()
    })

    const passwordInput = screen.getByLabelText(/senha/i)
    
    fireEvent.change(passwordInput, { target: { value: ' ' } })

    await waitFor(() => {
      const errorPassword = screen.getByText('Preencha este campo')
      expect(errorPassword).toBeInTheDocument()
    })
  })

  it('should fill form', () => {
    render(<Login />)

    const userInput = screen.getByLabelText(/usuário/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    fireEvent.change(userInput, { target: { value: 'amanda@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'pass123' } })

    expect(userInput).toHaveValue('amanda@gmail.com')
    expect(passwordInput).toHaveValue('pass123')
  })

  it('should log user', async () => {

    LoginService.login = jest.fn(() => Promise.resolve({ data: { tipo: 'Tipo',
    token: 'dfsdfsd$f4fdsfs$fm23klm32' }}))

    const history = createMemoryHistory()
    history.location.pathname = '/login'

    const saveToken = jest.fn()

    render(<AuthProvider value={{ saveToken }}>
        <Router history={history}>
        <Login />
      </Router>
      </AuthProvider>)

    const userInput = screen.getByLabelText(/usuário/i)
    const passwordInput = screen.getByLabelText(/senha/i)


    fireEvent.change(userInput, { target: { value: 'amanda@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'pass123' } })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(LoginService.login).toHaveBeenCalled()
    expect(LoginService.login).toHaveBeenCalledWith({ email: 'amanda@gmail.com', password: 'pass123' })

    await waitFor(() => expect(history.location.pathname).toEqual('/vehicle'), { timeout: 2000})
  })
})