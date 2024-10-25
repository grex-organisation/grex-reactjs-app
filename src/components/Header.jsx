import React, { useState } from 'react';
import icon_ranking from '../assets/icons/ranking.png';
import icon_dashboard from '../assets/icons/dashboard.png';
import icon_learn from '../assets/icons/learn.png';
import icon_practice from '../assets/icons/practice.png';
import icon_challenge from '../assets/icons/challenge.png';
import icon_profile from '../assets/icons/profile.png';
import icon_logout from '../assets/icons/logout.png';
import icon_crown from '../assets/icons/crown.png';

import { Link } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../services/JWTService';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false); // State to toggle menu visibility

    async function onLogOut() {
        removeToken();
        navigate('/');
    }

    async function onLogin() {
        navigate('/login');
    }

    function toggleMenu() {
        setIsActive(!isActive); // Toggle the 'is-active' class
    }

    return (
        <>
            <nav className="navbar is-white has-shadow" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <span className="navbar-item"></span>

                    <a
                        role="button"
                        className={`navbar-burger ${isActive ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={toggleMenu} // Toggle menu on click
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/dashboard"><img className="m-1" src={icon_dashboard} alt="Dashboard" /><b>Dashboard</b></Link>
                        <Link className="navbar-item" to="/learn"><img className="m-1" src={icon_learn} alt="Learn" /><b>Learn</b></Link>
                        <Link className="navbar-item" to="/ranking"><img className="m-1" src={icon_practice} alt="Practice" /><b>Practice</b></Link>
                        <Link className="navbar-item" to="/challenge"><img className="m-1" src={icon_challenge} alt="Challenge" /><b>Challenge</b></Link>
                        <Link className="navbar-item" to="/ranking"><img className="m-1" src={icon_ranking} alt="Ranking" /><b>Ranking</b></Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {isAuthenticated() ? (
                                    <div className="dropdown is-right is-hoverable">
                                        <div className="dropdown-trigger">
                                            <Link className="navbar-item"><img className="m-1" src={icon_profile} alt="Account" /><b>Account</b></Link>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <Link to="/profile" className="dropdown-item">
                                                    <span className="is-flex is-align-items-center">
                                                        <img className="m-1" src={icon_profile} alt="Profile Icon" style={{ height: '24px', width: '24px' }} />
                                                        <b className="ml-2">Profile</b>
                                                    </span>
                                                </Link>

                                                <hr className="dropdown-divider" />

                                                <Link className="dropdown-item" onClick={() => {}}>
                                                    <span className="is-flex is-align-items-center">
                                                        <img className="m-1" src={icon_crown} alt="Subscription Icon" style={{ height: '24px', width: '24px' }} />
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
    );
}
