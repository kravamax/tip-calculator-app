export function allowOnlyInt(e) {
  const blockedKeys = ['e', 'E', '+', '-', ',', '.'];
  if (blockedKeys.includes(e.key)) {
    e.preventDefault();
  }
}

export function allowOnlyFloat(e) {
  const blockedKeys = ['e', 'E', '+', '-', ','];
  if (blockedKeys.includes(e.key)) {
    e.preventDefault();
  }
}

export function hideInputBillErrorMessage(e, inputBillErrorMessage) {
  e.target.classList.remove('input__error');
  e.target.classList.remove('input__correct');
  inputBillErrorMessage.classList.add('sub-header__error--hidden');
}

export function hideNumPeopleErrorMessage(e, NumPeopleErrorMessage) {
  e.target.classList.remove('input__error');
  e.target.classList.remove('input__correct');

  NumPeopleErrorMessage.classList.add('sub-header__error--hidden');
}
