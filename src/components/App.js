import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, withRouter, Redirect } from 'react-router-dom';
import * as auth from '../utils/Auth';
import '../index.css';
import { InfoToolTip } from './InfoTooltip';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupEditProfile } from './PopupEditProfile';
import { PopupEditAvatar } from './PopupEditAvatar';
import { PopupAddPlace } from './PopupAddPlace';
import { ImagePopup } from './ImagePopup';
import { newApi } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Login from './Login';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';


function App() {

  const history = useHistory();

  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const [loggedIn, setLoggedIn] = useState(false)
  const [login, setLogin] = useState('')

  const [open, setIsOpen] = useState(false);
  const [regOk, setRegOK] = useState(false)


  useEffect(() => {
    Promise.all([newApi.getUSerInfoFromServer(), newApi.getCardsFromServer()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)

      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('token')
    if (jwt) {
      auth.getContent(jwt)
        .then(res => {
          if (res) {
            setLogin(res.data.email)
            handleLogin()
            history.push('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }, [history])

  function handleLogin() {
    setLoggedIn(true)
  }

  function closeModal() {
    setIsOpen(false)
    setRegOK(false)

  }

  function registration(password, email) {
    auth.register(password, email)

      .then((res) => {
        if (res) {
          setIsOpen(true)
          setRegOK(true)
          setTimeout(() => {
            setIsOpen(false)
            history.push('/sign-in')
          }, 2000)
        }
      })
      .catch(err => {
        console.log(err)
        setIsOpen(true)
        setRegOK(false)
        setTimeout(() => {
          setIsOpen(false)
        }, 2000)
      })
  }


  function authorization(password, email) {
    auth.login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      })
      .then(() => {
        handleLogin()
        history.push('/')
      })
      .then(() => {
        const jwt = localStorage.getItem('token')
        if (jwt) {
          auth.getContent(jwt)
            .then(res => {
              if (res) {
                setLogin(res.data.email)
                handleLogin()
                history.push('/')
              }
            })
            .catch((err) => console.log(err))
        }
      })
  }


  function signOut() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    history.push('/sign-in')
  }

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
        setCards((state) => state.filter((c) => c._id !== card._id))
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
        <Switch>


          <Route path='/sign-up'>
            <Register loggedIn={loggedIn} registration={registration} />
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} authorization={authorization} />
          </Route>

          <ProtectedRoute
            signOut={signOut}
            login={login}
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <Route>
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/sign-up" />
            )}
          </Route>

        </Switch>
        <PopupEditProfile isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupAddPlace isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupEditAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoToolTip confirmReg={regOk} isOpen={open} onClose={closeModal} />
        <Footer />
      </div>
    </CurrentUserContext.Provider >
  )
}

export default withRouter(App);