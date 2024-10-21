import React from 'react'
import icon_ranking from '../assests/icons/ranking.png'
import icon_dashboard from '../assests/icons/dashboard.png'
import icon_learn from '../assests/icons/learn.png'
import icon_practice from '../assests/icons/practice.png'
import icon_challenge from '../assests/icons/challenge.png'
import icon_profile from '../assests/icons/profile.png'
import icon_logout from '../assests/icons/logout.png'
import icon_crown from '../assests/icons/crown.png'


import { Link } from 'react-router-dom'
import { isAuthenticated, removeToken, getToken } from '../services/JWTService';
import { useNavigate } from 'react-router-dom';


export default function Header() {

    const navigate = useNavigate();

    async function onLogOut() {
        removeToken();
        navigate('/');
    }

    async function onLogin() {
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar is-white has-shadow" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <span className="navbar-item">
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
                        <Link className="navbar-item" to="/dashboard"><img className="m-1" src={icon_dashboard} /><b>Dashboard</b></Link>
                        <Link className="navbar-item" to="/learn"><img className="m-1" src={icon_learn} /><b>Learn</b></Link>
                        <Link className="navbar-item" to="/ranking"><img className="m-1" src={icon_practice} /><b>Practice</b></Link>
                        <Link className="navbar-item" to="/challenge"><img className="m-1" src={icon_challenge} /><b>Challenge</b></Link>
                        <Link className="navbar-item" to="/ranking"><img className="m-1" src={icon_ranking} /><b>Ranking</b></Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {isAuthenticated() ? (
                                    <div className="dropdown is-right is-hoverable">
                                        <div className="dropdown-trigger">
                                        <Link className="navbar-item" to="/profile"><img className="m-1" src={icon_profile} /><b>Profile</b></Link>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                
                                                <Link className="dropdown-item" onClick="">
                                                    <span className="is-flex is-align-items-center">
                                                        <img className="m-1" src={icon_crown} alt="Logout Icon" style={{ height: '24px', width: '24px' }} />
                                                        <b className="ml-2">Subscription</b>
                                                    </span>
                                                </Link>

                                                <hr className="dropdown-divider" />

                                                <Link className="dropdown-item" onClick={onLogOut}>
                                                    <span className="is-flex is-align-items-center">
                                                        <img className="m-1" src={icon_logout} alt="Logout Icon" style={{ height: '24px', width: '24px' }} />
                                                        <b className="ml-2">Logout</b>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="button is-dark is-hovered is-rounded" onClick={onLogin}>
                                        Log in
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
            <br />
            <br />
        </>
    )
}
