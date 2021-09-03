import React from "react";
import { formatCurrency } from "../../../../utils/currency";
import s from "./Card.module.css"


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
    <section className={s.card}>
      <header>
        <h3 className={s.title}>{brandName} </h3>
      </header>
      <p>{showTotalVehiclesText()}</p>
      <p>R$ {formatCurrency(totalAmount)}</p>
    </section>
  )
}

export default Card;