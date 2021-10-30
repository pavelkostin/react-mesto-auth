import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


export function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    // deletion btn class
    const isOwn = card.owner._id === currentUser._id;
    const delBtnClass = (
        ` ${isOwn ? 'cards__delete' : 'cards__delete_hidden'}`
    );

    // like btn class
    const isLiked = card.likes.some(like=>like._id === currentUser._id)
    const likeBtnClass = (
        `cards__like ${isLiked ? 'cards__like_active' : ''}`
    )

    return (
        <>
            <li
                className="cards__item">
                <img className="cards__photo" onClick={() => { onCardClick(card) }} src={card.link} alt={card.name} />
                <p className="cards__place">{card.name}</p>
                <button className={delBtnClass} onClick={()=>{onCardDelete(card)}}></button>
                <button className={likeBtnClass} onClick={() => { onCardLike(card)}}></button>
                <p className="cards__quantity-likes">{card.likes.length}</p>
            </li>

        </>
    )
}