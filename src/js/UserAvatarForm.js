import FormValidator from './FormValidator';

export default class UserAvatarForm extends FormValidator {
  constructor(form, errorMessages) {
    super(form, errorMessages);
    this.linkField = this.form.elements.avatar;
  }

  render = () => {
    this.linkField.focus();
    this.checkInputValidity(this.linkField);
    this.setSubmitButtonState();
    this.setListeners();
  };

  get formFieldValue() {
    return this.linkField.value;
  }
}
