import React, { Component } from "react";

import "./style.css";
import CardList from "./Components/CardList";

class Dashboard extends Component {

  constructor(){
    super();

    this.state = {
      cards:[
        {brandName: 'GM', totalVehicles: 1, totalAmount: 600000},
        {brandName: 'GM', totalVehicles: 1, totalAmount: 600000},
        {brandName: 'GM', totalVehicles: 10, totalAmount: 600000},
        {brandName: 'GM', totalVehicles: 1, totalAmount: 600000},
        {brandName: 'GM', totalVehicles: 20, totalAmount: 600000},
        {brandName: 'GM', totalVehicles: null, totalAmount: 600000},
        {brandName: 'GM', totalVehicles: 1, totalAmount: 600000},
        {brandName: 'GM', totalVehicles: 1, totalAmount: 600000},
        ]
    }
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