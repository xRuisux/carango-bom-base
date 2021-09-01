import { findByText, fireEvent, render, screen, waitFor } from "@testing-library/react"

import Login from "."
import LoginService from "../../services/LoginService"

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

  // it('should display invalid email message', async () => {
  //   render(<Login />)

  //   const userInput = screen.getByLabelText(/usuário/i)
  //   fireEvent.change(userInput, { target: { value: 'amanda.com' } })

  //   const error = await findByText('Insira um email válido')
    
  //   expect(error).toBeInTheDocument()
  // })

  // it('should not submit form', () => {
  //   render(<Login />)

  //   fireEvent.click(screen.getByRole('button'))

  //   expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument()
  // })

  it('should fill form', () => {
    render(<Login />)

    const userInput = screen.getByLabelText(/usuário/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    fireEvent.change(userInput, { target: { value: 'amanda@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'pass123' } })

    expect(userInput).toHaveValue('amanda@gmail.com')
    expect(passwordInput).toHaveValue('pass123')
  })

  it('should log user', () => {

    LoginService.login = jest.fn(() => Promise.resolve({ data: { tipo: 'Tipo',
    token: 'dfsdfsd$f4fdsfs$fm23klm32' }}))

    render(<Login />)

    const userInput = screen.getByLabelText(/usuário/i)
    const passwordInput = screen.getByLabelText(/senha/i)


    fireEvent.change(userInput, { target: { value: 'amanda@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'pass123' } })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(LoginService.login).toHaveBeenCalled()
    expect(LoginService.login).toHaveBeenCalledWith({ email: 'amanda@gmail.com', password: 'pass123' })
  })
})