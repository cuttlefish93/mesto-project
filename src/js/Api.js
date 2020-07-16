export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  //Проверка cтатуса запроса
  checkData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
  }

  //Получаем информацию о пользователе
  getUserInfo = () => {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then((response) => {
      return this.checkData(response);
    });
  }

  //Обновляем информацию о пользователе
  saveUserInfo = ({ name, about }) => {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      }),
    }).then((response) => {
      return this.checkData(response);
    });
  }

  //Обновляем ссылку на аватар пользователя
  saveUserAvatar = (link) => {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((response) => {
      return this.checkData(response);
    });
  }

  //Получаем массив существующих карточек
  getDefaultCards = () => {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((response) => {
      return this.checkData(response);
    });
  }

  //Сохраняем данные о новой карточке
  saveNewCard = ({ name, link }) => {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      }),
    }).then((response) => {
      return this.checkData(response);
    });
  }

  //Сохраняем лайк для карточки
  addLikeToCard = (id) => {
    return fetch(`${this.url}/cards/like/${id}`, {
      method: "PUT",
      headers: this.headers,
    }).then((response) => {
      return this.checkData(response);
    });
  }

  //Удаляем лайк с карточки
  deleteLikeFromCard = (id) => {
    return fetch(`${this.url}/cards/like/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((response) => {
      return this.checkData(response);
    });
  }

  //Удаляем карточку
  deleteCard = (id) => {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((response) => {
      return this.checkData(response);
    });
  }
}
