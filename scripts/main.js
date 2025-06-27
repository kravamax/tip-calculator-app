const form = document.querySelector('.form__container');
const resetButton = document.querySelector('.reset-button');
const inputBill = document.querySelector('#bill');
const inputNumPeople = document.querySelector('#number-people');
const inputBillErrorMessage = document.querySelector(
  '.input-bill__sub-header--error'
);
const inputNumPeopleErrorMessage = document.querySelector(
  '.number-people__sub-header--error'
);
const selectTipButtons = document.querySelector('.select-tip__list');
const customTipInput = document.querySelector('#custom-tip');
const buttons = document.querySelectorAll('.select-tip__button');
const inputs = form.querySelectorAll('.input');

let billValue = '';
let tipValue = '';
let numPeopleValue = '';

import {
  allowOnlyInt,
  allowOnlyFloat,
  hideInputBillErrorMessage,
  hideNumPeopleErrorMessage,
  removeClassFromElement,
  addClassToElement,
  setResultsDefaultValues,
  renderResults,
  addSuccessBorderToInput,
  addErrorBorderToInput,
} from './helpers.js';

inputBill.addEventListener('keydown', allowOnlyFloat);
inputNumPeople.addEventListener('keydown', allowOnlyInt);
customTipInput.addEventListener('keydown', allowOnlyInt);

inputBill.addEventListener('input', (e) => {
  e.preventDefault();

  billValue = inputBill.value;

  hideInputBillErrorMessage(e, inputBillErrorMessage);

  if (isPositiveNumber(billValue) && billValue !== '') {
    addClassToElement(inputBillErrorMessage, 'sub-header__error--hidden');
    addSuccessBorderToInput(inputBill);
  } else if (!isPositiveNumber(billValue) && billValue !== '') {
    removeClassFromElement(inputBillErrorMessage, 'sub-header__error--hidden');
    addErrorBorderToInput(inputBill);
  }
});

inputNumPeople.addEventListener('input', (e) => {
  e.preventDefault();

  numPeopleValue = e.target.value;

  hideNumPeopleErrorMessage(e, inputNumPeopleErrorMessage);

  if (isPositiveNumber(e.target.value) && e.target.value !== '') {
    addClassToElement(inputNumPeopleErrorMessage, 'sub-header__error--hidden');
    addSuccessBorderToInput(inputNumPeople);
  } else if (!isPositiveNumber(e.target.value) && e.target.value !== '') {
    inputNumPeopleErrorMessage.classList.remove('sub-header__error--hidden');

    inputNumPeople.classList.remove('input__correct');
    inputNumPeople.classList.add('input__error');
  }
});

selectTipButtons.addEventListener('click', (e) => {
  e.preventDefault();
  removeClassFromElement(customTipInput, 'button-tip--active');
  resetButton.disabled = false;

  if (e.target.classList.contains('select-tip__button')) {
    customTipInput.value = '';

    tipValue = Number(e.target.dataset.tipValue);
    removeClassFromElement(customTipInput, 'input__correct');

    buttons.forEach((btn) => removeClassFromElement(btn, 'button-tip--active'));

    addClassToElement(e.target, 'input__correct');
  }

  e.target.classList.add('button-tip--active');
});

customTipInput.addEventListener('click', () => {
  buttons.forEach((btn) => removeClassFromElement(btn, 'button-tip--active'));
});

customTipInput.addEventListener('input', (e) => {
  tipValue = Number(e.target.value);

  if (tipValue) {
    addClassToElement(customTipInput, 'input__correct');
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', checkFormValues);
});

function isPositiveNumber(value) {
  return !Number.isNaN(parseFloat(value)) && value > 0;
}

function checkFormValues() {
  const hasValue = Array.from(inputs).some(
    (input) => input.value.trim() !== '' || isPositiveNumber(input.value)
  );

  resetButton.disabled = !hasValue;
}

form.addEventListener('reset', () => {
  inputs.forEach((input) => {
    input.classList.remove('input__correct', 'input__error');
    addClassToElement(inputBillErrorMessage, 'sub-header__error--hidden');
    addClassToElement(inputNumPeopleErrorMessage, 'sub-header__error--hidden');
  });
  setTimeout(() => {
    billValue = null;
    tipValue = null;
    numPeopleValue = null;

    setResultsDefaultValues();
    removeClassFromElement(customTipInput, 'button-tip--active');
    buttons.forEach((btn) => removeClassFromElement(btn, 'button-tip--active'));

    resetButton.disabled = true;
  }, 0);
});

form.addEventListener('input', () => {
  if (
    isPositiveNumber(billValue) &&
    isPositiveNumber(tipValue) &&
    isPositiveNumber(numPeopleValue)
  ) {
    renderResults(billValue, tipValue, numPeopleValue);
  } else {
    setResultsDefaultValues();
  }
});
