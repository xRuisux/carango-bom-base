import { useEffect, useState } from 'react'
import { StyledButton, StyledTextField, useStyles } from './styles'
import useErros from '../../hooks/useErros'
import LoginService from '../../services/LoginService'
import { useAutenticacao } from '../../hooks/useAutenticacao'
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { validaEmail } from '../../utils/validaEmail'

export default function Login() {

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(false)
  const { salvaToken, token } = useAutenticacao()
  const history = useHistory()

  function inputPreencido(valorInput) {
    if (!!valorInput) {
      return { valido: true }
    }
    return { valido: false, texto: "Preencha este campo" }
  }

  const validacoes = {
    usuario: valorInput => {
      return { valido: validaEmail(valorInput), texto: 'Insira um email válido' }
    },
    senha: valorInput => inputPreencido(valorInput)
  }

  const [erros, validarCampos, possoEnviar] = useErros(validacoes)

  function atualizaErro(erroValor) {
    setErro(erroValor)
  }

  function submissaoValida() {
    const temInputVazio = !senha || !usuario;
    atualizaErro(temInputVazio)

    if (temInputVazio) return

    return possoEnviar()
  }

  async function efetuarLogin(e) {
    e.preventDefault()

    if (submissaoValida()) {
      setLoading(true)
      const { token } = await LoginService.login({ email: usuario, senha })

      salvaToken(token)

      if (token) {
        setTimeout(() => {
          setLoading(false)
          history.push('/veiculos')
        }, 1000)
      }
    }
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <form data-testid="form" id="form" onSubmit={efetuarLogin}>
        <h1>Login</h1>
        {!loading ? <>
          <StyledTextField
            placeholder="Digite seu email"
            id="usuario"
            label="Usuário"
            name="usuario"
            onChange={({ target: { value } }) => setUsuario(value)}
            onBlur={validarCampos}
            fullWidth
            variant="outlined"
            helperText={erros.usuario.texto}
            error={!erros.usuario.valido}
          />

          <StyledTextField
            placeholder="Digite sua senha"
            id="senha"
            type="password"
            label="Senha"
            name="senha"
            onChange={({ target: { value } }) => setSenha(value)}
            onBlur={validarCampos}
            fullWidth
            variant="outlined"
            helperText={erros.senha.texto}
            error={!erros.senha.valido}
          />

          {erro && <p className={classes.msgErro}>Preencha todos os campos</p>}

          <StyledButton form="form" fullWidth type="submit" variant="contained">
            Entrar
          </StyledButton>
        </> : <CircularProgress thickness={2} />}
      </form>
    </div>
  )
}