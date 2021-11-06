import { useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';

import { Header } from './Header';
import * as auth from './Auth';


export function Login({ handleLogin, loggedIn, login }) {

    const history = useHistory();

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
        auth.login(password, email)  //     L O G I N
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    
                }
            })
            .then(() => {
                handleLogin()
                history.push('/')
            })
    }


    return (
        <>
            <Header to='/sign-up' loggedIn={loggedIn} login={login} placeholder='Регистрация'></Header>
            <section className='auth'>
                <h2 className='auth__header'>Вход</h2>
                <form className='auth__form' onSubmit={handleSubmit}>
                    <input name='e-mail' className='auth__input' placeholder='E-mail' value={email} onChange={handleChangeEmail}></input>
                    <input name='password' className='auth__input' placeholder='Пароль' value={password} onChange={handleChangePassword}></input>
                    <button className='auth__submit'>Войти</button>
                </form>
            </section>
        </>
    )
}


export default withRouter(Login);