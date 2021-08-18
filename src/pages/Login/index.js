import { useState } from 'react'
import { StyledButton, StyledTextField, useStyles } from './styles'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  function submitForm(e) {
    e.preventDefault()

    if(!username || !password) {
      setErrorMessage('Preencha todos os campos')
    }
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <form data-testid="form" id="form" onSubmit={submitForm}>
        <h1>Login</h1>
        <StyledTextField fullWidth id="usuário" label="Usuário" variant="outlined" onChange={({ target: { value }}) => setUsername(value)} />
        <StyledTextField fullWidth type="password" id="senha" label="Senha" variant="outlined" onChange={({ target: { value }}) => setPassword(value)} />
        {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
        <StyledButton form="form" fullWidth type="submit" variant="contained">Entrar</StyledButton>
      </form>
    </div>
  )
}