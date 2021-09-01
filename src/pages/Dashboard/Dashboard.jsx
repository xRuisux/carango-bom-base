import React, { Component, useEffect } from "react";
import "./Dashboard.css";
import CardList from "./Components/CardList";
import DashboardService from "../../services/DashboardService";
import { useState } from "react";

//class Dashboard extends Component {
function Dashboard(){
  const [cards, setCards] = useState([])
  const [error, setError] = useState()

//   constructor(){
//     super();

//     this.state = {
//       cards:[]
//     }
//     this.getMyReport()
//   }
 const getMyReport = () => {
    DashboardService.brandReport()
    .then(response => {
        const { data } = response;
        setCards(data);
    }).catch(()=> setError('Houve um erro ao carregar o relatórios'));
  }
  useEffect(() => {
    getMyReport();
  }, []);


    return (
      <section className="allContent"> 
        <h3 className="dashboard_title"> Relatório de Vendas </h3>
        <section className="content">s
            {error ? <p>{error}</p> : <CardList cards={cards}/>}
        </section>
      </section>
      
    );
}

export default Dashboard;