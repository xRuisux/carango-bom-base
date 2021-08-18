import { screen, render, fireEvent } from "@testing-library/react"
import { InputLabel } from "."

describe('<InputLabel />', () => {
  it('renders correctly', () => {
    render(<InputLabel label="Senha" placeholder="Digite sua senha" />)

    const input = screen.getByRole('textbox')

    expect(screen.getByLabelText('Senha:')).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Digite sua senha')
  })

  it('should call function on input change and fill the input', () => {
    const onChangeFunc = jest.fn()

    render(<InputLabel label="Senha:" placeholder="Digite sua senha" onInputChange={onChangeFunc} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'minhasenha' } })

    expect(onChangeFunc).toHaveBeenCalled()
    expect(input).toHaveValue('minhasenha')
  })
})