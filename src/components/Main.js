import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Card } from './Card.js';
import { Header } from './Header';

export function Main({ signOut, loggedIn, login, cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    return (

        <>
            <Header to='/sign-in' loggedIn={loggedIn} login={login} placeholder='Выйти' signOut={signOut}></Header>
            
            <main>
                <section className="profile">
                    <div className="profile__info">
                        <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} onClick={onEditAvatar} />
                        <div className="profile__table">
                            <div className="profile__name">{currentUser.name}</div>
                            <button className="profile__edit" onClick={onEditProfile} type="button"></button>
                            <div className="profile__job">{currentUser.about}</div>
                        </div>
                    </div>
                    <button className="profile__add" onClick={onAddPlace} type="button"></button>
                </section>
                <section className="cards">
                    <ul className="cards__list">
                        {cards.map((card) => {
                            return (
                                <Card
                                    onCardLike={onCardLike}
                                    onCardClick={onCardClick}
                                    onCardDelete={onCardDelete}
                                    key={card._id}
                                    card={card}
                                />
                            )
                        })}
                    </ul>
                </section>
            </main>
        </>
    )
}
