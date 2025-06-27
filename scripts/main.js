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
const tipAmountValue = document.querySelector('.tip-amount__result');
const totalValue = document.querySelector('.total__result');

let billValue = '';
let tipValue = '';
let numPeopleValue = '';

import {
  allowOnlyInt,
  allowOnlyFloat,
  hideInputBillErrorMessage,
  hideNumPeopleErrorMessage,
} from './helpers.js';

inputBill.addEventListener('keydown', allowOnlyFloat);
inputNumPeople.addEventListener('keydown', allowOnlyInt);
customTipInput.addEventListener('keydown', allowOnlyInt);

inputBill.addEventListener('input', (e) => {
  e.preventDefault();
  billValue = inputBill.value;

  hideInputBillErrorMessage(e, inputBillErrorMessage);

  if (isPositiveNumber(billValue) && billValue !== '') {
    inputBillErrorMessage.classList.add('sub-header__error--hidden');

    inputBill.classList.add('input__correct');
    inputBill.classList.remove('input__error');

    console.log('billValue', billValue);
  } else if (!isPositiveNumber(billValue) && billValue !== '') {
    inputBillErrorMessage.classList.remove('sub-header__error--hidden');

    inputBill.classList.remove('input__correct');
    inputBill.classList.add('input__error');
  }
});

inputNumPeople.addEventListener('input', (e) => {
  e.preventDefault();

  numPeopleValue = inputNumPeople.value;

  hideNumPeopleErrorMessage(e, inputNumPeopleErrorMessage);

  if (isPositiveNumber(numPeopleValue) && numPeopleValue !== '') {
    inputNumPeopleErrorMessage.classList.add('sub-header__error--hidden');

    inputNumPeople.classList.add('input__correct');
    inputNumPeople.classList.remove('input__error');
  } else if (!isPositiveNumber(numPeopleValue) && numPeopleValue !== '') {
    inputNumPeopleErrorMessage.classList.remove('sub-header__error--hidden');

    inputNumPeople.classList.remove('input__correct');
    inputNumPeople.classList.add('input__error');
  }

  console.log('numPeopleValue', numPeopleValue);
});

selectTipButtons.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('select-tip__button')) {
    customTipInput.value = '';
    //   tipValue = parseInt(e.target.dataset.tipValue);
    tipValue = Number(e.target.dataset.tipValue);
    customTipInput.classList.remove('input__correct');

    buttons.forEach((btn) => btn.classList.remove('button-tip--active'));
    e.target.classList.add('.input__correct');

    console.log('Выбран процент', tipValue);
  }

  e.target.classList.add('.button-tip--active');

  //   if (tipValue && tipValue !== 'custom') {
  //     customTipInput.value = '';
  //     customTipInput.classList.remove('input__correct');
  //   }
});

customTipInput.addEventListener('input', (e) => {
  buttons.forEach((btn) => btn.classList.remove('button-tip--active'));
  tipValue = Number(e.target.value);

  if (tipValue) {
    customTipInput.classList.add('input__correct');
  }

  console.log('Кастомный процент:', tipValue);
});

inputs.forEach((input) => {
  input.addEventListener('input', checkFormValues);
});

function isPositiveNumber(value) {
  return !Number.isNaN(parseFloat(value)) && value > 0;
}

function checkFormValues() {
  const hasValue = Array.from(inputs).some(
    (input) => input.value.trim() !== ''
  );

  console.log('hasValue', hasValue);
  resetButton.disabled = !hasValue;
}

form.addEventListener('reset', () => {
  inputs.forEach((input) => {
    input.classList.remove('input__correct');
    input.classList.remove('input__error');
    inputBillErrorMessage.classList.add('sub-header__error--hidden');
    inputNumPeopleErrorMessage.classList.add('sub-header__error--hidden');
  });
  setTimeout(() => {
    tipAmountValue.innerText = '$0.00';
    totalValue.innerText = '$0.00';
    resetButton.disabled = true;
  }, 0);
});

form.addEventListener('input', (e) => {
  const allInputsHasValue = Array.from(inputs).every(
    (input) => input.value.trim() !== '' && input.value !== NaN
  );

  console.log('INPUTS');
  console.log('Bill', billValue);
  console.log('tipValue', tipValue);
  console.log('numPeopleValue', numPeopleValue);

  if (billValue === 0 || numPeopleValue === 0) {
    tipAmountValue.innerText = '$0.00';
    totalValue.innerText = '$0.00';
    // resetButton.disabled = true;
  } else if (allInputsHasValue) {
    const totalValueCalculated = Number(
      ((billValue * (1 + tipValue / 100)) / numPeopleValue).toFixed(2)
    );
    const tipAmountCalculated = Number(
      (totalValueCalculated - billValue / numPeopleValue).toFixed(2)
    );
    tipAmountValue.innerText = `$${tipAmountCalculated}`;
    totalValue.innerText = `$${totalValueCalculated}`;

    // console.log('totalValueCalculated', totalValueCalculated);
    // console.log('tipAmountCalculated', tipAmountCalculated);
  } else {
    // resetButton.disabled = true;
    tipAmountValue.innerText = '$0.00';
    totalValue.innerText = '$0.00';
  }
});

// console.log('INPUTS', inputs);
