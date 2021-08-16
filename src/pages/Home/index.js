import { Link } from "react-router-dom";
import s from "./styles.module.css";

export default function Home() {
  
  return (
    <section className={s.container}>
      <div className={s.content}>
        <h1>Bem vinda ao Carango Bom!</h1>
        <Link to="/veiculos" className={s.link}>Visualizar veículos</Link>
        <Link to="/login" className={s.link}>Efetuar login</Link>
      </div>
    </section>
  )
}