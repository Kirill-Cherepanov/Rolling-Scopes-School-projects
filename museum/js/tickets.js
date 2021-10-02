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


// Open form button
buyNowBtn.addEventListener("click", event => {
  event.preventDefault();

  // Set values from tickets section
  const bookingForm = document.querySelector("aside.booking-ticket form");
  let checkedBtn = Array.from(ticketForm['ticket-type']).filter(item => item.checked)[0];

  let typeCost;
  switch (Array.from(ticketForm['ticket-type']).indexOf(checkedBtn)) {
    case 0:
      typeCost = 20;
      break;
    case 1: 
      typeCost = 25;
      break;
    case 2:
      typeCost = 40;
      break;
  }

  bookingForm['ticket-type'].value = checkedBtn.id;

  bookingForm['basic-counter'].value = ticketForm['basic-ticket-counter'].value;

  bookingForm['senior-counter'].value = ticketForm['senior-ticket-counter'].value;

  document.querySelector('aside .basic-cost .basic-count').innerText = ticketForm['basic-ticket-counter'].value;
  document.querySelector('aside .senior-cost .senior-count').innerText = ticketForm['senior-ticket-counter'].value;

  document.querySelectorAll('aside .basic-type-cost').forEach(item => item.innerText = typeCost);
  document.querySelectorAll('aside .senior-type-cost').forEach(item => item.innerText = typeCost / 2);
  
  document.querySelector('aside .basic-cost .basic-total').innerText = ticketForm['basic-ticket-counter'].value * typeCost + ' €';
  document.querySelector('aside .senior-cost .senior-total').innerText = ticketForm['senior-ticket-counter'].value * typeCost / 2 + ' €';

  document.querySelector('aside .total-cost').innerText = totalAmount.innerText + ' €';

  bookingTicketForm.hidden = false;
  setTimeout(() => bookingTicketFormContainer.style.left = '0', 50);
});