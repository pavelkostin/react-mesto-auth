import succesImg from '../images/succes.jpg'
import unSuccesImg from '../images/unsucces.jpg'


export function InfoToolTip({ confirmReg, onClose, isOpen }) {


    return (

        <section className={`popup ${isOpen ? 'popup_visible' : ''}`} >

            <div className="popup__container">
                <button className="popup__close" onClick={onClose}></button>
                <div style={{ display: `flex`, flexDirection: 'column', justifyContent: 'center' }}>
                    <img className='auth__img' alt='auth__img' src={confirmReg ? succesImg : unSuccesImg} />
                    <h2 className="popup__header popup__header_tooltip">{confirmReg ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                </div>
            </div>
        </section>

    )
}