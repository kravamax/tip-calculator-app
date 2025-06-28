const tipAmountValue = document.querySelector('.tip-amount__result');
const totalValue = document.querySelector('.total__result');

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

export function addSuccessBorderToInput(element) {
  element.classList.remove('input__error');
  element.classList.add('input__correct');
}

export function addErrorBorderToInput(element) {
  element.classList.remove('input__correct');
  element.classList.add('input__error');
}

export function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

export function addClassToElement(element, className) {
  element.classList.add(className);
}

export function setResultsDefaultValues() {
  tipAmountValue.innerText = '$0.00';
  totalValue.innerText = '$0.00';
}
export function renderResults(billValue, tipValue, numPeopleValue) {
  const totalValueCalculated = Number(
    (billValue * (1 + tipValue / 100)) / numPeopleValue
  ).toFixed(2);
  const tipAmountCalculated = Number(
    (totalValueCalculated - billValue / numPeopleValue).toFixed(2)
  );
  tipAmountValue.innerText = `$${tipAmountCalculated}`;
  totalValue.innerText = `$${totalValueCalculated}`;
}
