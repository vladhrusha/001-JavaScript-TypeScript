import { Validator } from './Classes/validator.js';

let form = document.querySelector('.account-create');
form.addEventListener('submit', validateForm);

function validateForm(form) {
  const validator = new Validator();
  form.preventDefault();
  let email = document.forms['account-create']['email'].value;
  let date = document.forms['account-create']['date'].value;

  if (validator.isEmail(email)) {
    console.log('Email is valid');
  } else console.log('Email is not valid');

  if (validator.isDate(date)) {
    console.log('Date is valid');
  } else console.log('Date is not valid');

  validator.isRequired(document.forms['account-create']['FirstName']);
  validator.isRequired(document.forms['account-create']['PasswordOne']);
  validator.isRequired(document.forms['account-create']['PasswordConfirm']);
}
