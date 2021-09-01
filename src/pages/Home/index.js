import { Link } from "react-router-dom"
import { useStyles } from "./styles"

export default function Home() {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <section className={classes.content}>
        <h1 className={classes.heading}>Bem vinda ao Carango Bom!</h1>
        <Link to="/vehicle" className={classes.link}>Visualizar veículos</Link>
        <Link to="/login" className={classes.link}>Efetuar login</Link>
      </section>
    </div>
  )
}