import React, { Component } from "react";

import "./style.css";
import CardList from "./Components/CardList";
import DashboardService from "../../services/DashboardService";

class Dashboard extends Component {

  constructor(){
    super();

    this.state = {
      cards:[]
    }
    this.getMyReport()
  }
  getMyReport() {
    DashboardService.brandReport()
    .then(response => {
        const { data } = response;
        this.setState({ cards: data });
    }).catch(e => console.log(e));
  }
  
  render() {

    return (
      <section> 
        <h3 className="dashboard_title"> Relatório de Vendas </h3>
        <section className="content">
            <CardList cards={this.state.cards}/>
        </section>
      </section>
      
    );
  }
}

export default Dashboard;