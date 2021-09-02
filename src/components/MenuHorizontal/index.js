import { Link } from "react-router-dom";
import './MenuHorizontal.css'

export default function MenuHorizontal({isAuthenticated}) {
    function logout() {
        localStorage.clear();
        window.location.href = '/login';
    }
    if (isAuthenticated) {
        return (
            <div className="container">
                <ul className="menu">
                    <li><Link to="/vehicle" >Veículos</Link></li>
                    <li><Link to="/brands" > Marcas </Link></li>
                    <li><Link to="/user" > Usuários </Link></li>
                    <li><Link to="/dashboard" >Dashboard</Link></li>
                    <li><Link  onClick={logout}>Sair</Link></li>
                </ul>
            </div>
        )
    } else {
        return (
            <div className="container">
                <ul className="menu">
                    <li><Link to="/vehicle" >Veículos</Link></li>
                    <li><Link to="/login" > login </Link></li>
                </ul>
            </div>
        )
    }
}

