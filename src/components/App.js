import React, { useEffect, useState } from 'react';
import '../index.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupEditProfile } from './PopupEditProfile';
import { PopupEditAvatar } from './PopupEditAvatar';
import { PopupAddPlace } from './PopupAddPlace';
import { PopupConfirm } from './PopupConfirm';
import { ImagePopup } from './ImagePopup';
import { newApi } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


export function App() {

  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  useEffect(() => {
    Promise.all([newApi.getUSerInfoFromServer(), newApi.getCardsFromServer()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)
      })
      .catch((err) => console.log(err))
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id)

    newApi.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    newApi.deleteCard(card)
      .then(() => {
        setCards(cards.filter((cardsList) => {

          return cardsList._id !== card._id

        }))
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(user) {
    newApi.setUserInfo(user)
      .then((currentUser) => {
        setCurrentUser(currentUser)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(link) {
    newApi.editAvatar(link)
      .then((currentUser) => {
        setCurrentUser(currentUser)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    newApi.postNewCard(data)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))

  }


  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <PopupEditProfile isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupAddPlace isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupEditAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupConfirm />
      </div>
    </CurrentUserContext.Provider>

  )
}
