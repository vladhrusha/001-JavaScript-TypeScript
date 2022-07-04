import { Validator } from './Classes/validator.js';

let form = document.querySelector('.account-create');
form.addEventListener('submit', onValidateForm);

function onValidateForm(event) {
  event.preventDefault();

  let email = form.email;
  let date = form.date;

  if (Validator.isEmail(email.value)) {
    email.style.border = '';
  } else email.style.border = '5px solid red';

  if (Validator.isDate(date.value)) {
    date.style.border = '';
  } else date.style.border = '5px solid red';

  Validator.isRequired(form.FirstName);
  Validator.isRequired(form.PasswordOne);
  Validator.isRequired(form.PasswordConfirm);
}
