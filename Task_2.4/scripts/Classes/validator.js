class Validator {
  isEmail(email) {
    let mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailFormat)) {
      return true;
    } else {
      return false;
    }
  }

  isDate(date) {
    if (!Number.isNaN(Date.parse(date))) {
      return true;
    } else return false;
  }

  isRequired(input) {
    if (input.value == '') {
      console.log(`${input.name} is required`);
      return false;
    }
  }
}

export { Validator };
