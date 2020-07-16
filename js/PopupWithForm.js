class PopupWithForm extends Popup {
  constructor(popup, modifier, resetForm) {
    super(popup, modifier);
    this.resetForm = resetForm;
  }

  close() {
    super.close();
    this.resetForm();
  }
}
