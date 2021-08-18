import { useState } from 'react'
import { StyledButton, StyledTextField, useStyles } from './styles'
import Input from '@material-ui/core/Input'
import { InputLabel } from '../../components/InputLabel'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false);

  function submitForm(e) {
    e.preventDefault()

    const isAllFieldsFilled = !username || !password

    setHasError(isAllFieldsFilled)

    if (!isAllFieldsFilled) {
      return
    }

    console.log('submit')
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <form data-testid="form" id="form" onSubmit={submitForm}>
        <h1>Login</h1>

        <InputLabel
          placeholder="Digite seu email"
          label="Usuário"
          onInputChange={({ target: { value } }) => setUsername(value)}
        />

        <InputLabel
          placeholder="Digite sua senha"
          type="password"
          label="Senha"
          onInputChange={({ target: { value } }) => setPassword(value)}
        />

        {hasError && <p className={classes.errorMessage}>Preencha todos os campos</p>}

        <StyledButton form="form" fullWidth type="submit" variant="contained">Entrar</StyledButton>
      </form>
    </div>
  )
}