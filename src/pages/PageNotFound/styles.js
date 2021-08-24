import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    width: '100wh',
    height: '100vh',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',

    '& h1': {
      margin: 0,
      fontSize: '3rem'
    },
  },

  link: {
    fontSize: '1.5rem',
    color: theme.palette.primary.yellow,
    textDecoration: 'none',
    marginTop: '.5rem',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))