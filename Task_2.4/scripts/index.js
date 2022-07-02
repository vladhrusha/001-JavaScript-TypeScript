import { Validator } from './Classes/validator.js';

let form = document.querySelector('.account-create');
form.addEventListener('submit', validateForm);

function validateForm(form) {
  form.preventDefault();
  let email = document.forms['account-create']['email'];
  let date = document.forms['account-create']['date'];

  if (Validator.isEmail(email.value)) {
    email.style.border = '';
  } else email.style.border = '5px solid red';

  if (Validator.isDate(date.value)) {
    date.style.border = '';
  } else date.style.border = '5px solid red';

  Validator.isRequired(document.forms['account-create']['FirstName']);
  Validator.isRequired(document.forms['account-create']['PasswordOne']);
  Validator.isRequired(document.forms['account-create']['PasswordConfirm']);
}
