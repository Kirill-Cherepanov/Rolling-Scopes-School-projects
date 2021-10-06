'use strict'

const ticketForm = document.querySelector('.buy-tickets');
const incrementorBtns = document.querySelectorAll('.tickets__incrementor-btn');
const totalAmount = document.querySelector('.total-amount');
const buyNowBtn = document.querySelector("button.buy-now");

// Form calculator
Array.from(ticketForm['ticket-type']).forEach(elem => {
  elem.addEventListener('change', calcF);
});
Array.from(incrementorBtns).forEach(elem => {
  elem.addEventListener('click', calcF);
});

function calcF(e) {
  let cost;
  let checkedBtn = Array.from(ticketForm['ticket-type']).filter(item => item.checked)[0];

  switch (Array.from(ticketForm['ticket-type']).indexOf(checkedBtn)) {
    case 0:
      cost = 20;
      break;
    case 1: 
      cost = 25;
      break;
    case 2:
      cost = 40;
      break;
  }
  cost *= parseInt(ticketForm['basic-ticket-counter'].value)  + parseInt(ticketForm['senior-ticket-counter'].value) / 2;

  totalAmount.innerText = cost;
}