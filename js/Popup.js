class Popup {
  constructor(popup, modifier) {
    this.popup = popup;
    this.modifier = modifier;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    this.popup.classList.add(this.modifier);
    this.setListeners();
  }

  close() {
    this.removeListeners();
    this.popup.classList.remove(this.modifier);
  }

  closeByPopup = (event) => {
    if (event.target.classList.contains("popup")) {
      this.close();
    }
  };

  closeByEscKey = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };

  setListeners() {
    this.popup
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
    this.popup.addEventListener("click", this.closeByPopup);
    document.addEventListener("keydown", this.closeByEscKey);
  }

  removeListeners() {
    this.popup
      .querySelector(".popup__close")
      .removeEventListener("click", this.close);
    this.popup.addEventListener("click", this.closeByPopup);
    document.addEventListener("keydown", this.closeByEscKey);
  }
}
