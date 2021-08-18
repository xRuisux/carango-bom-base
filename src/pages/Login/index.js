import { Button, TextField, makeStyles } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& form': {
      backgroundColor: theme.palette.white,
      padding: '2rem 1.5rem',
      borderRadius: '.4rem',
      width: '85%',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

      [theme.breakpoints.up('sm')]: {
        maxWidth: '40%',
        height: '40vh',
        padding: '3rem'
      },

      '& h1': {
        fontSize: '2rem',
        color: theme.palette.primary.main,
        marginBottom: '2rem'
      },
    },
    input: {
      margin: '2rem'
    }
  },
}))

const StyledTextField = withStyles({
  root: {
    margin: '1rem 0'
  },
})(TextField)

const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.yellow,
    padding: '1.2rem',
    marginTop: '1.5rem',
    fontWeight: 'bold',
    fontSize: '1rem',

    '&:hover': {
      backgroundColor: theme.palette.primary.yellow,
    }
  }
}))(Button)

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
        {errorMessage && <p>{errorMessage}</p>}
        <StyledButton form="form" fullWidth type="submit" variant="contained">Entrar</StyledButton>
      </form>
    </div>
  )
}