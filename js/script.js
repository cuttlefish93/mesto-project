"use strict";
(function () {
  /** Переменные */
  const cardTemplate = document.querySelector(".template-for-card");
  const addCardPopupBtn = document.querySelector(".user-info__button");
  const editUserInfoBtn = document.querySelector(".user-info__edit-button");
  const userName = document.querySelector(".user-info__name");
  const userAbout = document.querySelector(".user-info__job");
  const userAvatar = document.querySelector(".user-info__photo");

  /** Экземпляры и коллбэки */
  const user = new UserInfo();
  const api = new Api(config);
  const messagePopup = new MessagePopup(document.querySelector(".message-popup"), "popup_is-opened");
  const cardList = new CardList(document.querySelector(".places-list"));
  const confirmDeletePopup = new ConfirmDeletePopup(document.querySelector(".confirm-delete-popup"), "popup_is-opened");
  const avatarForm = new UserAvatarForm(document.querySelector(".user-avatar-form"), errorMessages);
  const avatarFormReset = () => { avatarForm.resetForm() }; //Коллбэк для сброса формы при закрытия попапа
  const avatarPopup = new PopupWithForm(document.querySelector(".user-avatar-popup"), "popup_is-opened", avatarFormReset);
  const newCardForm = new NewCardForm(document.querySelector(".add-card-form"), errorMessages);
  const newCardFormReset = () => { newCardForm.resetForm() }; //Коллбэк для сброса формы при закрытии попапа
  const newCardPopup = new PopupWithForm(document.querySelector(".add-card-popup"), "popup_is-opened", newCardFormReset);
  const userForm = new UserForm(document.querySelector(".user-data-form"), errorMessages);
  const userFormReset = () => { userForm.resetForm() }; //Коллбэк для сброса формы при закрытии попапа
  const userPopup = new PopupWithForm(document.querySelector(".user-data-popup"), "popup_is-opened", userFormReset);
  const imagePopup = new ImagePopup(document.querySelector(".image-popup"), "popup_is-opened");
  const openImagePopup = (link) => { imagePopup.open(link) }; //Коллбэк для открытия попапа с изображением
  const createCard = ({ ...args }) => { //Коллбэк для создания экземляра карточки
    return new Card(
      cardTemplate,
      openImagePopup,
      sendLike,
      deleteLike,
      user.id,
      deleteCard,
      confirmDeletePopup,
      messagePopup
    ).create({ ...args });
  };

  function getDefaultCards() { //Коллбэк для запроса на получение карточек
    return api.getDefaultCards().catch((err) => {
      messagePopup.open(err, 'Данные не загрузились. Попробуйте обновить страницу либо обратитесь в службу поддержки');
    });
  }

  function sendLike(id) { //Коллбэк для запроса на добавление лайка
    return api.addLikeToCard(id);
  }

  function deleteLike(id) { //Коллбэк для запроса на удаление лайка
    return api.deleteLikeFromCard(id);
  }

  function deleteCard(id) { //Коллбэк для запроса на удаление карточки
    return api.deleteCard(id);
  }

  /** Исполнение кода */
  //Подгружаем данные о пользователе
  api.getUserInfo()
    .then((userData) => {
      user.getUserInfo(userData);
      user.updateUserInfo(userName, userAbout);
      user.updateUserAvatar(userAvatar);
    })
    .catch((err) => {
      userName.textContent = "Имя пользователя";
      userAbout.textContent = "Информация о пользователе";
      userAvatar.textContent = "Аватар пользователя";
      messagePopup.open(err, 'Повторите попытку либо обратитесь в службу поддержки!');
    });

  //Отображение готовых карточек
  cardList.render(getDefaultCards, createCard);

  //Открытие попапа для добавления новой карточки
  addCardPopupBtn.addEventListener("click", () => {
    newCardPopup.open();
    newCardForm.render();
  });

  //Открытие попапа для редактирования информации о пользователе
  editUserInfoBtn.addEventListener("click", () => {
    userPopup.open();
    userForm.render(user.userInfo);
  });

  //Открытие попапа для изменения аватара
  userAvatar.addEventListener("click", () => {
    avatarPopup.open();
    avatarForm.render();
  });

  //Сабмит формы добавления новой карточки
  newCardForm.getForm.addEventListener("submit", (event) => {
    const previousBtnValue = newCardForm.submitBtn.textContent;
    const newValue = "Загружается...";
    event.preventDefault();
    newCardForm.submitBtn.classList.add("add-card-popup__submit-btn"); //Новый класс для изменения размера шрифта
    newCardForm.submitBtn.textContent = newValue;
    //Запрос на сохранение новой карточки
    api
      .saveNewCard(newCardForm.formFieldsValues)
      .then((card) => {
        cardList.addCard(
          createCard({
            textForCard: card.name,
            imageForCard: card.link,
            likesNumber: card.likes.length,
            cardId: card._id,
            ownerId: card.owner._id,
            likesArr: card.likes
          })
        );
        newCardPopup.close();
        newCardForm.resetForm();
      })
      .catch((err) => {
        messagePopup.open(err, 'Повторите попытку либо обратитесь в службу поддержки');
      })
      .finally(() => {
        newCardForm.submitBtn.classList.remove("add-card-popup__submit-btn");
        newCardForm.submitBtn.textContent = previousBtnValue;
      });
  });

  //Сабмит формы редактирования информации о пользователе
  userForm.getForm.addEventListener("submit", (event) => {
    const previousBtnValue = userForm.submitBtn.textContent;
    const newValue = "Загружается...";
    event.preventDefault();
    userForm.submitBtn.textContent = newValue;
    //Запрос для обновления данных пользователя
    api
      .saveUserInfo(userForm.formFieldsValues)
      .then((newUserInfo) => {
        user.setUserInfo(newUserInfo);
        user.updateUserInfo(userName, userAbout);
        userPopup.close();
        userForm.resetForm();
      })
      .catch((err) => {
        messagePopup.open(err, 'Повторите попытку либо обратитесь в службу поддержки');
      })
      .finally(() => {
        userForm.submitBtn.textContent = previousBtnValue;
      });
  });

  //Сабмит формы изменения аватара
  avatarForm.getForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //Запрос для обновления ссылки аватара пользователя
    api
      .saveUserAvatar(avatarForm.formFieldValue)
      .then((newUserData) => {
        user.setUserAvatar(newUserData.avatar);
        user.updateUserAvatar(userAvatar);
        avatarPopup.close();
        avatarForm.resetForm();
      }).catch((err) => {
        messagePopup.open(err, 'Повторите попытку либо обратитесь в службу поддержки');
      });
  });
})();