import React from 'react';


export function ImagePopup ({card, onClose}) {
    return (
        <section
        className={`popup popup_gallery ${card.link ? 'popup_visible' : ''}`}>
        
            <div className="popup__container popup__container_gallery">
                <button onClick={onClose} className="popup__close"></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__caption">{card.name}</p>
            </div>
        </section>
    )
}

