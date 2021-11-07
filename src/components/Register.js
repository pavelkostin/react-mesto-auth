import { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Header } from './Header';


function Register({ registration, loggedIn, login }) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        registration(password, email)
    }


    return (
        <>
            <Header to='/sign-in' loggedIn={loggedIn} login={login} placeholder='Вход'></Header>
            <section className='auth'>
                <h2 className='auth__header'>Регистрация</h2>
                <form className='auth__form' onSubmit={handleSubmit}>
                    <input className='auth__input' type='text' placeholder='E-mail' value={email} onChange={handleChangeEmail}></input>
                    <input className='auth__input' type='password' placeholder='Пароль' value={password} onChange={handleChangePassword}></input>
                    <button className='auth__submit'>Зарегистрироваться</button>
                    <NavLink to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</NavLink>
                </form>
            </section>
            
        </>
    )
}


export default withRouter(Register);