import { useEffect, useState } from 'react'
import { StyledButton, StyledTextField, useStyles } from './styles'
import useErros from '../../hooks/useErros'
import LoginService from '../../services/LoginService'
import { useAutenticacao } from '../../hooks/useAutenticacao'
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

export default function Login() {

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(false)
  const { salvaToken, token } = useAutenticacao()
  const history = useHistory()

  // useEffect(() => {
  //   return () => {
  //     setLoading(false)
  //   }
  // })

  function inputPreencido(valorInput) {
    if (!!valorInput) {
      return { valido: true }
    }
    return { valido: false, texto: "Preencha este campo" }
  }

  const validacoes = {
    senha: valorInput => inputPreencido(valorInput),
    usuario: valorInput => inputPreencido(valorInput)
  }

  const [erros, validarCampos] = useErros(validacoes)

  async function efetuarLogin(e) {
    e.preventDefault()

    if (!senha || !usuario) {
      setErro(true)
      return
    } else {
      setErro(false)
    }

    setLoading(true)
    const { token, erro } = await LoginService.login({ email: usuario, senha })
    salvaToken(token)

    setTimeout(() => {
      setLoading(false)
      history.push('/veiculos')
    }, 1000)
    // TODO: logar

    /**
     * TODO
     * - Redirecionar para tela veículos após login
     * - Criar rotas privadas e públicas
     */
  }

  const classes = useStyles()

  console.log('aqui', { token })

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
            id="senha"
            placeholder="Digite sua senha"
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
            {/* {loading && <span className={classes.span}><CircularProgress size={12} /></span>} */}
          </StyledButton>
        </> : <CircularProgress thickness={2} />}
      </form>
    </div>
  )
}