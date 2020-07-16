class UserForm extends FormValidator {
  constructor(form, errorMessages) {
    super(form, errorMessages);
    this.userNameField = this.form.elements.name;
    this.userJobField = this.form.elements.job;
  }

  render = ({ name, about }) => {
    this.userNameField.focus();
    this.userNameField.value = name;
    this.userJobField.value = about;
    this.checkInputValidity(this.userNameField);
    this.checkInputValidity(this.userJobField);
    this.setSubmitButtonState();
    this.setListeners();
  };

  get formFieldsValues() {
    return {
      name: this.userNameField.value,
      about: this.userJobField.value
    }
  }

  get submitBtn() {
    return this.form.querySelector(".popup__button");
  }
}
