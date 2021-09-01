import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: theme.palette.white,
    padding: '2rem 1.2rem',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '.4rem',

    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      height: '40vh',
      padding: '3rem'
    },

    '& h1': {
      margin: '0',
      fontSize: '2rem',
      width: '60%',
      textAlign: 'center',
      marginBottom: '2rem',
      color: theme.palette.primary.main

    }
  },
  link: {
    backgroundColor: theme.palette.secondary.main,
    padding: '.8rem 1.2rem',
    borderRadius: '.4rem',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textDecoration: 'none',
    margin: '1.2rem',
    fontSize: '1rem',
    width: '60%',
    textAlign: 'center',
  }
}))