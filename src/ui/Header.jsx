import React from 'react'
import icon_home from '../assests/icons/home.png'
import icon_ranking from '../assests/icons/ranking.png'
import icon_game from '../assests/icons/games.png'
import icon_dashboard from '../assests/icons/dashboard.png'
import icon_logo from '../assests/icons/logo.png'

import { Link } from 'react-router-dom'
import { isAuthenticated, removeToken,getToken } from '../services/JWTService';
import { useNavigate } from 'react-router-dom';


export default function Header() {

const navigate = useNavigate();

async function onLogOut(){
    removeToken();
    navigate('/');
}

async function onLogin(){
    navigate('/login');
}

    return (
        <>
        <nav className="navbar is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <span className="navbar-item">
                <figure className="logo"><a href="/"><img src={icon_logo} alt="grex vocublary" width="100" height="80"/></a></figure>
                </span>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">               
                     <img className="m-1" src={icon_home} alt="Home" width="30" height="30"/>
                    Home</Link>
                    <Link className="navbar-item" to="/dashboard">
                    <img className="m-1" src={icon_dashboard} alt="Home" width="30" height="30"/>
                    Dashboard</Link>
                    <Link className="navbar-item" to="/ranking">
                    <img className="m-1" src={icon_ranking} alt="Home" width="30" height="30"/>
                    Leadership Board</Link>
                    <Link className="navbar-item" to="/challenge">
                    <img className="m-1" src={icon_game} alt="Home" width="30" height="30"/>
                    Challenge</Link>

             </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                             isAuthenticated() ? <button className="button is-round" width="40" height="40" onClick={onLogOut}>Log Out</button> : <button className="button is-white is-hovered is-rounded is-small"  onClick={onLogin}>Log in</button>
                            }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <br/>
        <br/>
        </>
    )
}
