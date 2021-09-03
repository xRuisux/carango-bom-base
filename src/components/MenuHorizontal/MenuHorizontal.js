import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import s from './MenuHorizontal.module.css'

export default function MenuHorizontal() {
    const [currentPath, setCurrentPath] = useState(false)
    const history = useHistory();
    const location = useLocation();

    function logout() {
        localStorage.clear();
        history.push("/");
    }

    function shouldActivateLink(pathname) {
        return location.pathname.includes(pathname)
    }

    useEffect(() => {
        setCurrentPath(location.pathname !== '/login' && location.pathname !== '/')
    }, [location.pathname])

    if (!!localStorage.getItem('token') && currentPath) {
        return (
            <div className={s.container}>
                <ul className={s.menu}>
                    <li><Link className={`${shouldActivateLink('vehicle') && s.active}`} to="/vehicle" >Veículos</Link></li>
                    <li><Link className={`${shouldActivateLink('brand') && s.active}`} to="/brands" > Marcas </Link></li>
                    <li><Link className={`${shouldActivateLink('user') && s.active}`} to="/user" > Usuários </Link></li>
                    <li><Link className={`${shouldActivateLink('dashboard') && s.active}`} to="/dashboard" >Dashboard</Link></li>
                    <li><Link to="/" onClick={logout}>Sair</Link></li>
                </ul>
            </div>
        )
    } else if (currentPath){
        return (
            <div className={s.container}>
                <ul className={s.menu}>
                    <li><Link className={`s.link ${shouldActivateLink('vehicle') && s.active}`} to="/vehicle" >Veículos</Link></li>
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

