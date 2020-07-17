export default class Card {
  constructor(
    template, //Шаблон карточки
    openImagePopup, //Метод класса ImagePopup для открытия попапа с изображением
    sendLike, //Запрос на сервер на добавление лайка
    deleteLike, //Запрос на сервер на удаление лайка
    getUserId, //Получаем id владельца карточки для отображения инонки удаления
    deleteCard, //Запрос на сервер на удаление карточки
    confirmDeletePopup, //Экземпляр класса ConfirmDeletePopup для отображения запроса на удаление карточки
    messagePopup //Экземпляр класса MessagePopup для отображения информации об успешном окончании действия
  ) {
    this.card = null;
    this.template = template;
    this.openImagePopup = openImagePopup;
    this.sendLike = sendLike;
    this.deleteLike = deleteLike;
    this.userId = getUserId;
    this.deleteCard = deleteCard;
    this.confirmDeletePopup = confirmDeletePopup;
    this.showMessage = messagePopup;
  }

  create({ textForCard, imageForCard, likesNumber, cardId, ownerId, likesArr }) {
		/**
		 *  textForCard: название карточки
		 *  imageForCard: ссылка на изображение для карточки
		 *  likesNumber: длина массива для отображения количества лайков
		 *  cardId: id карточки
		 *  ownerId: id владельца для отображения иконки удаления
     * likesArr: массив пользователей, лайкнувших карточку
		 */
    const cloneTemplate = this.template.content.cloneNode(true);
    this.card = cloneTemplate.querySelector(".place-card");
    this.cardName = this.card.querySelector(".place-card__name");
    this.cardImage = this.card.querySelector(".place-card__image");
    this.cardDeleteIcon = this.card.querySelector(".place-card__delete-icon");
    this.cardLikeIcon = this.card.querySelector(".place-card__like-icon");
    this.cardLikeCounter = this.card.querySelector(".place-card__like-counter");
    this.cardName.textContent = textForCard;
    this.cardImage.style.backgroundImage = `url(${imageForCard})`;
    this.cardLikeCounter.textContent = likesNumber;
    this.cardId = cardId;
    this.ownerId = ownerId;
    this.setListeners();
    this.handleDeleteIcon();
    this.isLiked(likesArr);
    return this.card;
  }

  isLiked = (likesArr) => {
    likesArr.forEach(item => {
      if (item._id === this.userId) {
        this.cardLikeIcon.classList.add('place-card__like-icon_liked');
      }
    })
  }

  remove = () => {
    this.deleteCard(this.cardId)
      .then((deletedCard) => {
        this.removeListeners();
        this.card.remove();
        this.confirmDeletePopup.close();
        return deletedCard;
      })
      .then((deleteCard) => {
        this.showMessage.open(deleteCard.message);
      })
      .catch((err) => {
        this.showMessage.open(
          err, 'Пост не удален. Повторите попытку либо обратитесь в службу поддержки'
        );
      });
  };

  confirmDelete = (event) => {
    event.stopPropagation();
    this.confirmDeletePopup.open();
    this.confirmDeletePopup.ifDeleteConfirmed(this.remove);
  };

  handleLikes = () => {
    if (this.cardLikeIcon.classList.contains("place-card__like-icon_liked")) {
      this.deleteLike(this.cardId)
        .then((newData) => {
          this.cardLikeIcon.classList.remove("place-card__like-icon_liked");
          this.cardLikeCounter.textContent = newData.likes.length;
        })
        .catch((err) => {
          this.showMessage.open(
            err, '🖤 не снято с поста. Попробуйте снова либо обратитесь в поддержку'
          );
        });
    } else {
      this.sendLike(this.cardId)
        .then((newData) => {
          this.cardLikeIcon.classList.add("place-card__like-icon_liked");
          this.cardLikeCounter.textContent = newData.likes.length;
        })
        .catch((err) => {
          this.showMessage.open(
            err, '🖤 не добавлено. Попробуйте снова либо обратитесь в поддержку'
          );
        });
    }
  };

  zoomCardImage = (event) => {
    const link = event.target.style.backgroundImage.slice(5, -2);
    this.openImagePopup(link);
  };

  handleDeleteIcon = () => {
    if (this.userId === this.ownerId) {
      this.cardDeleteIcon.style.display = "block";
    }
  };

  setListeners() {
    this.cardDeleteIcon.addEventListener("click", this.confirmDelete);
    this.cardLikeIcon.addEventListener("click", this.handleLikes);
    this.cardImage.addEventListener("click", this.zoomCardImage);
  }

  removeListeners() {
    this.cardDeleteIcon.removeEventListener("click", this.confirmDelete);
    this.cardLikeIcon.removeEventListener("click", this.handleLikes);
    this.cardImage.removeEventListener("click", this.zoomCardImage);
  }
}
