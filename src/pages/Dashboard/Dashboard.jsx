import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CardList from "./Components/CardList";
import DashboardService from "../../services/DashboardService";

function Dashboard(){
  const [cards, setCards] = useState([])
  const [error, setError] = useState()

 const getMyReport = () => {
    DashboardService.brandReport()
    .then(response => {
        console.log(response)
        const { data, error } = response;
        if (error) {
          setError('Houve um erro ao carregar o relatórios');
        }
        console.log(data)
        setCards(data);
    }).catch(() => setError('Houve um erro ao carregar o relatórios'));
  }
  useEffect(() => {
    getMyReport();
  }, []);

  if (error) {
    return ( 
      <section className="allContent"> 
          <section className="content">
            <h1 className="error">{error}</h1> 
          </section>
      </section>
    );
  } else {
    return ( 
      <section className="allContent"> 
          <h3 className="dashboard_title"> Relatório de Vendas </h3>
          <section className="content">
              <CardList cards={cards}/>
          </section>
      </section>
    );
  }
    
}

export default Dashboard;