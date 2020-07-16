class ConfirmDeletePopup extends Popup {
  constructor(popup, modifier) {
    super(popup, modifier);
    this.deleteBtn = this.popup.querySelector(".confirm-delete-popup__yes-btn");
    this.cancelDeleteBtn = this.popup.querySelector(".confirm-delete-popup__no-btn");
  }

  open() {
    this.popup.classList.add(this.modifier);
    this.setListeners();
  }

  ifDeleteConfirmed = (deleteCard) => {
    this.deleteBtn.addEventListener("click", deleteCard);
  }

  setListeners() {
    this.cancelDeleteBtn.addEventListener("click", this.close);
  }

  removeListeners() {
    this.cancelDeleteBtn.removeEventListener("click", this.close);
  }
}
