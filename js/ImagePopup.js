class ImagePopup extends Popup {
  constructor(popup, modifier) {
    super(popup, modifier);
    this.imageContainer = this.popup.querySelector(".image-popup__image");
  }

  open(link) {
    super.open();
    this.imageContainer.setAttribute("src", `${link}`);
  }
}
