import React, { useEffect, useState } from "react";
import s from "./Dashboard.module.css";
import CardList from "./Components/CardList";
import DashboardService from "../../services/DashboardService";

function Dashboard(){
  const [cards, setCards] = useState([])
  const [error, setError] = useState()

 const getMyReport = async () => {
    try {
      const data = await DashboardService.brandReport()
      setCards(data)
    } catch(err) {
      setError('Houve um erro ao carregar o relatórios')
    }
  }

  useEffect(() => {
    getMyReport();
  }, []);

  return (
    <section className={s.allContent}> 
      {!!error ? <section className={s.content}>
        <h1 className={s.error}>{error}</h1> 
      </section>
      : <>
          <h2 className={s.title}> Relatório de Vendas </h2>
          <section className={s.content}>
            <CardList cards={cards ?? []}/>
          </section>
      </>}
    </section>
  ) 
}

export default Dashboard;