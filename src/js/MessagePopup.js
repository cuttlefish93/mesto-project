import Popup from './Popup';

export default class MessagePopup extends Popup {
  constructor(popup, modifier) {
    super(popup, modifier);
    this.messageTitle = this.popup.querySelector(".popup__title");
    this.messageBody = this.popup.querySelector(".message-popup__subtitle");
  }

  open(title, text = '') {
    this.popup.classList.add(this.modifier);
    this.messageTitle.textContent = title;
    this.messageBody.textContent = text;
    this.close();
  }

  close() {
    setTimeout(() => {
      this.popup.classList.remove(this.modifier);
    }, 5000);
  }
}
