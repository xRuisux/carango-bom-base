import { useState } from 'react'
import { StyledButton, StyledTextField, useStyles } from './styles'
import useErrors from '../../hooks/useErrors'
import LoginService from '../../services/LoginService'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { validateEmail } from '../../utils/validateEmail'
import { delayFunc } from '../../utils/delayFunc'

export default function Login() {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { saveToken } = useAuth()
  const history = useHistory()

  function isInputFilled(inputValue) {
    if (!!inputValue) {
      return { valid: true }
    }
    return { valid: false, text: "Preencha este campo" }
  }

  const validations = {
    user: inputValue => {
      return { valid: validateEmail(inputValue), text: 'Insira um email válido' }
    },
    password: inputValue => isInputFilled(inputValue)
  }

  const [errors, validateFields, allFieldsValid] = useErrors(validations)

  function atualizaErro(error) {
    setError(error)
  }

  function submissaoValida() {
    const hasEmptyInput = !password || !user;
    atualizaErro(hasEmptyInput)

    if (hasEmptyInput) return

    return allFieldsValid()
  }

  async function login(e) {
    e.preventDefault()

    if (submissaoValida()) {
      setLoading(true)
      const { token } = await LoginService.login({ email: user, password })

      saveToken(token)
      await delayFunc(() => setLoading(false))

      if (token) {
        history.push('/veiculos')
      }
    }
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <form data-testid="form" id="form" onSubmit={login}>
        <h1>Login</h1>
        {!loading ? <>
          <StyledTextField
            placeholder="Digite seu email"
            id="user"
            label="Usuário"
            name="user"
            onChange={({ target: { value } }) => setUser(value)}
            onBlur={validateFields}
            fullWidth
            variant="outlined"
            helperText={errors.user.text}
            error={!errors.user.valid}
          />

          <StyledTextField
            placeholder="Digite sua password"
            id="password"
            type="password"
            label="Senha"
            name="password"
            onChange={({ target: { value } }) => setPassword(value)}
            onBlur={validateFields}
            fullWidth
            variant="outlined"
            helperText={errors.password.text}
            error={!errors.password.valid}
          />

          {error && <p className={classes.msgError}>Preencha todos os campos</p>}

          <StyledButton form="form" fullWidth type="submit" variant="contained">
            Entrar
          </StyledButton>
        </> : <CircularProgress thickness={2} />}
      </form>
    </div>
  )
}