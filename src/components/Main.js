import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Card } from './Card.js';


export function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <img className="profile__avatar" alt={currentUser.name} style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={onEditAvatar} />
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
    )
}
