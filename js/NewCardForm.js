class NewCardForm extends FormValidator {
  constructor(form, errorMessages) {
    super(form, errorMessages);
    this.cardNameField = this.form.elements.place;
    this.cardUrlField = this.form.elements.link;
  }

  render = () => {
    this.cardNameField.focus();
    this.setListeners();
  };

  get formFieldsValues() {
    return {
      name: this.cardNameField.value,
      link: this.cardUrlField.value
    }
  }

  get submitBtn() {
    return this.form.querySelector(".popup__button");
  }
}
