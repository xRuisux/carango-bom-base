import React, { Component } from "react";
import "./style.css"
class Card extends Component {

  
  _formatPrice(price) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(price)
  }
  
  render() {
    return (
      <section className="Card">
        <header className="card_header">
          <h3 className="card_title">{this.props.brandName} </h3>
        </header>
        <p className="card_text">{this.props.totalVehicles ? this.props.totalVehicles : 0} {this.props.totalVehicles && this.props.totalVehicles < 2 ? "veículo" :  "Veículos"}</p>
        <p className="card_text">{this._formatPrice(this.props.totalAmount)}</p>

      </section>
    );
  }
}

export default  Card;