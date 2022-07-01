import { Validator } from './Classes/validator.js';

let form = document.querySelector('.account-create');
form.addEventListener('submit', validateForm);

function validateForm(form) {
  form.preventDefault();
  let email = document.forms['account-create']['email'].value;
  let date = document.forms['account-create']['date'].value;

  if (Validator.isEmail(email)) {
    console.log('Email is valid');
  } else console.log('Email is not valid');

  if (Validator.isDate(date)) {
    console.log('Date is valid');
  } else console.log('Date is not valid');

  Validator.isRequired(document.forms['account-create']['FirstName']);
  Validator.isRequired(document.forms['account-create']['PasswordOne']);
  Validator.isRequired(document.forms['account-create']['PasswordConfirm']);
}
