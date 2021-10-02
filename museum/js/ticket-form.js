const bookBtn = document.querySelector("button.book-btn");
const closeBtn = document.querySelector("button.close-booking-form");
const bookingTicketForm = document.querySelector("aside.booking-ticket");
const bookingTicketFormContainer = bookingTicketForm.children[0];
const bookingForm = document.querySelector("aside.booking-ticket form");
const bookingIncrementorBtns = document.querySelectorAll('.booking__incrementor-btn');

// Ripple effect button
bookBtn.addEventListener("click", event => {
  const button = event.currentTarget;
  let btnCoords = button.getBoundingClientRect();

  const circle = document.createElement("span");
  circle.classList.add("ripple"); 
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  circle.style.width = circle.style.height = `${diameter}px`;

  circle.style.left = `${event.clientX - (btnCoords.left + diameter/2)}px`;
  circle.style.top = `${event.clientY - (btnCoords.top + diameter/2)}px`;

  console.log(circle.style.left);
  console.log(circle.style.top);

  if (button.getElementsByClassName("ripple")[0]) {
    button.getElementsByClassName("ripple")[0].remove();
  }
  button.appendChild(circle);
});


// Close button
closeBtn.addEventListener("click", event => {
  event.preventDefault();
  bookingTicketFormContainer.style.left = '-120vw';
  setTimeout(() => bookingTicketForm.hidden = true, 550);
});


// Calculate form
Array.from(bookingIncrementorBtns).forEach(elem => {
  elem.addEventListener('click', calcForm);
});
bookingForm['ticket-type'].addEventListener('click', calcForm);

function calcForm(e) {
  let typeCost;
  switch (bookingForm['ticket-type'].selectedIndex) {
    case 1:
      typeCost = 20;
      break;
    case 2: 
      typeCost = 25;
      break;
    case 3:
      typeCost = 40;
      break;
  }

  document.querySelector('aside .basic-cost .basic-count').innerText = bookingForm['basic-counter'].value;
  document.querySelector('aside .senior-cost .senior-count').innerText = bookingForm['senior-counter'].value;

  document.querySelectorAll('aside .basic-type-cost').forEach(item => item.innerText = typeCost);
  document.querySelectorAll('aside .senior-type-cost').forEach(item => item.innerText = typeCost / 2);
  
  document.querySelector('aside .basic-cost .basic-total').innerText = bookingForm['basic-counter'].value * typeCost + ' €';
  
  document.querySelector('aside .senior-cost .senior-total').innerText = bookingForm['senior-counter'].value * typeCost / 2 + ' €';

  document.querySelector('aside .total-cost').innerText = bookingForm['basic-counter'].value * typeCost + bookingForm['senior-counter'].value * typeCost / 2 + ' €';
}