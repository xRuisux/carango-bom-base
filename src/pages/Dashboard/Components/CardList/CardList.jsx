import React from "react";
import Card from "../Card";
import s from "./CardList.module.css";

function CardList({cards}) {
    return (
      <ul className={s.container}>
        {cards.map(({brandName, totalAmount, totalVehicles}, index) => {
          return (
            <li key={index}>
              <Card brandName={brandName} totalVehicles={totalVehicles} totalAmount={totalAmount}/>
            </li>
          );
        })}
      </ul>
    );
}

export default CardList;