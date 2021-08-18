import { useState } from 'react'
import { StyledButton, StyledTextField, useStyles } from './styles'
import useErros from '../../hooks/useErros'

export default function Login() {

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)


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

  function efetuarLogin(e) {
    e.preventDefault()

    if (!senha || !usuario) {
      setErro(true)
      return
    } else {
      setErro(false)
    }

    // TODO: logar

    /**
     * TODO
     * - Redirecionar para tela veículos após login
     * - Criar rotas privadas e públicas
     */
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <form data-testid="form" id="form" onSubmit={efetuarLogin}>
        <h1>Login</h1>

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

        <StyledButton form="form" fullWidth type="submit" variant="contained">Entrar</StyledButton>
      </form>
    </div>
  )
}