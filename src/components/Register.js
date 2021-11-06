import { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { InfoToolTip } from './InfoTooltip';
import { Header } from './Header';
import * as auth from './Auth';

function Register({ loggedIn, login }) {

    /* const history = useHistory(); */

    const [open, setIsOpen] = useState(false);
    const [regOk, setRegOK] = useState(false)

    function closeModal() {
        setIsOpen(false)
        setRegOK(false)
        
        setEmail('')
        setPassword('')

    }

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


        auth.register(password, email)

            .then((res) => {
                if(res.ok) {
                    setIsOpen(true)
                    setRegOK(true)
                    setTimeout(()=>{
                        setIsOpen(false)}, 2000)
                }else{
                    setIsOpen(true)
                    setRegOK(false)
                    setTimeout(()=>{
                        setIsOpen(false)}, 2000)
                }
                
            })
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
            <InfoToolTip confirmReg={regOk} isOpen={open} onClose={closeModal} />
        </>
    )
}


export default withRouter(Register);