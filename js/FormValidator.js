class FormValidator {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    this.submitButton = this.form.querySelector(".popup__button");
  }

  checkInputValidity = (element) => {
    element.setCustomValidity("");

    if (element.validity.valueMissing) {
      element.setCustomValidity(this.errorMessages.empty);
    }

    if (element.validity.tooShort || element.validity.tooLong) {
      element.setCustomValidity(this.errorMessages.wrongLength);
    }

    if (element.validity.typeMismatch && element.type === "url") {
      element.setCustomValidity(this.errorMessages.wrongUrl);
    }
  };

  getErrorElement = (element) => element.parentNode.querySelector(`#${element.id}-error`);

  setErrorMessage = (event) => {
    const errorMessage = this.getErrorElement(event.target);
    this.checkInputValidity(event.target);
    errorMessage.textContent = event.target.validationMessage;
  };

  setSubmitButtonState = () => {
    if (this.form.checkValidity()) {
      this.submitButton.removeAttribute("disabled");
      this.submitButton.classList.add("popup__button_valid");
      this.submitButton.classList.remove("popup__button_invalid");
    } else {
      this.submitButton.setAttribute("disabled", "");
      this.submitButton.classList.add("popup__button_invalid");
      this.submitButton.classList.remove("popup__button_valid");
    }
  };

  resetForm = () => {
    this.removeListeners();
    this.form.reset();
    this.setSubmitButtonState();
    this.formElements = [...this.form.elements];
    this.formElements.forEach((element) => {
      if (
        element.type !== "submit" &&
        element.type !== "button" &&
        element.tagName !== "BUTTON"
      ) {
        const errorMessage = this.getErrorElement(element);
        errorMessage.textContent = "";
      }
    });
  };

  get getForm() {
    return this.form;
  }

  setListeners() {
    this.form.addEventListener("input", this.setErrorMessage, true);
    this.form.addEventListener("input", this.setSubmitButtonState, true);
  }

  removeListeners() {
    this.form.removeEventListener("input", this.setErrorMessage, true);
    this.form.removeEventListener("input", this.setSubmitButtonState, true);
  }
}
