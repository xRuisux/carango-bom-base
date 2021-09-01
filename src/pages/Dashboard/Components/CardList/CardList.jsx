import React from "react";
import Card from "../Card";
import "./CardList.css";

function CardList({cards}) { 
    return (
      <ul className="card-list">
        {cards.map(({brandName, totalAmount, totalVehicles}, index) => {
          return (
            <li className="card-list_item" key={index}>
              <Card brandName={brandName} totalVehicles={totalVehicles} totalAmount={totalAmount}/>
            </li>
          );
        })}
      </ul>
    );
}

export default CardList;