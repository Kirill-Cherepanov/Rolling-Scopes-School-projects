const bookBtn = document.querySelector("button.book-btn");
const closeBtn = document.querySelector("button.close-booking-form");
const buyNowBtn = document.querySelector("button.buy-now");
const bookingTicketForm = document.querySelector("aside.booking-ticket");

// Ripple effect button
bookBtn.addEventListener("click", event => {
  event.preventDefault();
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

// Open button
buyNowBtn.addEventListener("click", event => {
  event.preventDefault();
  bookingTicketForm.hidden = false;
});


// Close button
closeBtn.addEventListener("click", event => {
  event.preventDefault();
  bookingTicketForm.hidden = true;
});