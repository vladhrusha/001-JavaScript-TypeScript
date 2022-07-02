class Validator {
  static isEmail(email) {
    let mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(mailFormat);
  }

  static isDate(date) {
    return !Number.isNaN(Date.parse(date));
  }

  static isRequired(input) {
    if (!input.value) {
      input.style.border = '5px solid orange';
    } else input.style.border = '';
  }
}

export { Validator };
