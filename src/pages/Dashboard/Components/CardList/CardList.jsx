import React, { Component } from "react";
import Card from "../Card";
import "./style.css";
class CardList extends Component {
 
  render() {
    return (
      <ul className="card-list">
        {this.props.cards.map((card, index) => {
          return (
            <li className="card-list_item" key={index}>
              <Card brandName={card.brandName} totalVehicles={card.totalVehicles} totalAmount={card.totalAmount}/>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CardList;