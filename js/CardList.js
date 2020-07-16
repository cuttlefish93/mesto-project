class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard(card) {
    this.container.append(card);
  }

  render(defaultCards, createCard) {
    defaultCards().then((cards) => {
      cards.forEach((card) => {
        this.addCard(
          createCard({
            textForCard: card.name,
            imageForCard: card.link,
            likesNumber: card.likes.length,
            cardId: card._id,
            ownerId: card.owner._id,
            likesArr: card.likes
          })
        );
      });
    });
  }
}
