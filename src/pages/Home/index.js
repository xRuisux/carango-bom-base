import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
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
    backgroundColor: theme.palette.primary.yellow,
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

export default function Home() {

  const classes = useStyles()

  return (
    <section className={classes.root}>
      <div className={classes.content}>
        <h1 className={classes.heading}>Bem vinda ao Carango Bom!</h1>
        <Link to="/veiculos" className={classes.link}>Visualizar veículos</Link>
        <Link to="/login" className={classes.link}>Efetuar login</Link>
      </div>
    </section>
  )
}