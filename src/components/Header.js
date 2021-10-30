import React from "react";
import headerLogo from "../images/header-logo.svg";


export function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип проекта Место" />
        </header>
    );
}

