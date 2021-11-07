import React from "react";
import { NavLink } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";


export function Header({ signOut, to, placeholder, login }) {




    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип проекта Место" />
            <div className='header__login'>
                <div className='header__email'>{login}</div>


                <NavLink to={to} className="header__link" onClick={signOut}>{placeholder}</NavLink>

            </div>
        </header>
    );
}