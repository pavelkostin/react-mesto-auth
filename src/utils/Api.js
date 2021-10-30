class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }


    getCardsFromServer() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }


    getUSerInfoFromServer() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }


    setUserInfo(user) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about
                
            }),
        }).then(this._checkResponse);
    }

    postNewCard(data) {

        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({

                name: data.name,
                link: data.link
                
            }),
        }).then(this._checkResponse);
    }



    getCardInfo(card) {
        return fetch(`${this._url}/cards/${card._cardId}`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkResponse);
    }


    deleteCard(card) {

        return fetch(`${this._url}/cards/${card._id}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(card, isLiked) {
        return fetch(`${this._url}/cards/likes/${card._id}`, {
            method: (isLiked ? "PUT" : "DELETE"),
            headers: this._headers
        })
        .then(this._checkResponse)

    }

/*     likeCard(card) {
        return fetch(`${this._url}/cards/likes/${card._cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    disLikeCard(card) {
        return fetch(`${this._url}/cards/likes/${card._cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    } */


/*     getCountsOfLikes(card) {
        return fetch(`${this._url}/cards/likes/${card._id}`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    } */

    editAvatar({avatar}) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(this._checkResponse);
    }

}


export const newApi = new Api({
    url: "https://nomoreparties.co/v1/cohort-22",
    headers: {
        authorization: "1ee4b4ce-cc80-4da8-ae23-ade464e5dd65",
        "Content-Type": "application/json",
    },
});

