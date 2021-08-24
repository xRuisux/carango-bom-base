import { Link } from "react-router-dom"
import { useStyles } from "./styles"


export function PageNotFound() {

  const classes = useStyles()

  return (
    <section className={classes.root}>
      <h1>Página não encontrada :(</h1>
      <Link className={classes.link} to="/">
        Voltar para o início
      </Link>
    </section>
  )
}