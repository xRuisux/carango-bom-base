import React from "react";
import { formatCurrency } from "../../../../utils/currency";
import "./Card.css"


function Card({brandName, totalAmount, totalVehicles}) {
  function showTotalVehiclesText() {
    if (totalVehicles && totalVehicles!== null) {
      if (totalVehicles > 1) {
        return totalVehicles + " veículos";
      } else {
        return totalVehicles + " veículo"
      }
    } else {
      return 'Não há veículos'
    }
  }
  return (
    <section className="card">
      <header className="card_header">
        <h3 className="card_title">{brandName} </h3>
      </header>
      <p className="card_text">{showTotalVehiclesText()}</p>
      <p className="card_text">R$ {formatCurrency(totalAmount)}</p>
    </section>
  )
}

export default Card;