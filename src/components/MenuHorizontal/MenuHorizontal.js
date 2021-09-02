import { Link, useHistory } from "react-router-dom";
import './MenuHorizontal.css'

export default function MenuHorizontal({isAuthenticated}) {
    const history = useHistory();
    function logout() {
        localStorage.clear();
        history.push("/");
    }
    const isOnUnauthenticatedPages = (history.location.pathname !== '/login' && history.location.pathname !== '/')

    if (isAuthenticated && isOnUnauthenticatedPages) {
        return (
            <div className="container">
                <ul className="menu">
                    <li><Link to="/vehicle" >Veículos</Link></li>
                    <li><Link to="/brands" > Marcas </Link></li>
                    <li><Link to="/user" > Usuários </Link></li>
                    <li><Link to="/dashboard" >Dashboard</Link></li>
                    <li><Link to="/" onClick={logout}>Sair</Link></li>
                </ul>
            </div>
        )
    } else if (isOnUnauthenticatedPages){
        return (
            <div className="container">
                <ul className="menu">
                    <li><Link to="/vehicle" >Veículos</Link></li>
                    <li><Link to="/login" > login </Link></li>
                </ul>
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

