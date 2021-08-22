import { Button, TextField, makeStyles } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& form': {
      backgroundColor: theme.palette.white,
      padding: '2rem',
      borderRadius: '.4rem',
      width: '85%',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

      [theme.breakpoints.up('sm')]: {
        maxWidth: '40%',
        height: 'auto',
        padding: '3rem'
      },

      '& h1': {
        fontSize: '2rem',
        color: theme.palette.primary.main,
        marginBottom: '2rem'
      },
    },
  },
  msgError: {
    fontSize: '1.2rem',
    color: theme.palette.red
  },
  label: {
    fontSize: '1.4rem'
  },
  span: {
    marginLeft: '1rem'
  }
}))

export const StyledTextField = withStyles({
  root: {
    margin: '1rem 0'
  },
})(TextField)

export const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.yellow,
    padding: '1.2rem',
    marginTop: '1.5rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '2rem',

    '&:hover': {
      backgroundColor: theme.palette.primary.yellow,
    }
  }
}))(Button)
