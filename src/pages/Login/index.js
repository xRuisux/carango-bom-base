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

  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({ email: '', password: ''});
  const { saveToken } = useAuth()
  const history = useHistory()

  function isInputFilled(inputValue) {
    if (!!inputValue.trim()) {
      return { valid: true }
    }
    return { valid: false, text: "Preencha este campo" }
  }

  const validations = {
    email: inputValue => {
      const isValid = validateEmail(inputValue)
      return isValid ? { valid: true } : { valid: false, text: 'Insira um email válido' }
    },
    password: inputValue => isInputFilled(inputValue)
  }

  const [errors, validateFields, allFieldsValid] = useErrors(validations)

  function isFormValid() {
    const areInputsFilled = !!formValues.password && !!formValues.email

    return allFieldsValid() && areInputsFilled
  }

  function updateFormValues(e) {
    const { target: { value, name } } = e
    delayFunc(() => validateFields({ name, value, ...e }), 500)
    setFormValues({ ...formValues, [name]: value })
  }

  async function login(e) {
    e.preventDefault()

    if (isFormValid()) {
      setLoading(true)
      const { data: { token } } = await LoginService.login({ ...formValues })

      saveToken(token)
      await delayFunc(() => setLoading(false))

      if (token) {
        history.push('/vehicle')
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
            id="email"
            label="Usuário"
            name="email"
            onChange={updateFormValues}
            onBlur={validateFields}
            fullWidth
            variant="outlined"
            helperText={errors.email.text}
            error={!errors.email.valid}
          />

          <StyledTextField
            placeholder="Digite sua password"
            id="password"
            type="password"
            label="Senha"
            name="password"
            onChange={updateFormValues}
            onBlur={validateFields}
            fullWidth
            variant="outlined"
            helperText={errors.password.text}
            error={!errors.password.valid}
          />

          <StyledButton form="form" fullWidth type="submit" variant="contained">
            Entrar
          </StyledButton>
        </> : <CircularProgress data-testid="loading" thickness={2} />}
      </form>
    </div>
  )
}