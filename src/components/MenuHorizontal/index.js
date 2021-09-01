import { Link } from "react-router-dom";
import './MenuHorizontal.css'

export default function MenuHorizontal() {
    return (
        <div className="container">
            <ul className="menu">
                <li><Link to="/vehicle" >Veículos</Link></li>
                <li><Link to="/brands" > Marcas </Link></li>
                <li><Link to="/user" > Usuários </Link></li>
                <li><Link to="/dashboard" >Dashboard</Link></li>
            </ul>
        </div>
   
    )
}
