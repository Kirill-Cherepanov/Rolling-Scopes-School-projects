'use strict'

// Изменить на true для потипового расчета стоимости билетов (можно будет выбрать билеты разных типов одновременно)
const PER_TICKET_TYPE_VALUE_CALCULATION = false;

const bookBtn = document.querySelector("button.book-btn");
const closeBtn = document.querySelector("button.close-booking-form");
const bookingTicketForm = document.querySelector("aside.booking-ticket");
const bookingTicketFormContainer = bookingTicketForm.children[0];
const bookingForm = document.querySelector("aside.booking-ticket form");
const bookingIncrementorBtns = document.querySelectorAll('.booking__incrementor-btn');

const inputDate = document.querySelector('aside .personal-info-column .icon-handler.date input');
const inputTime = document.querySelector('aside .personal-info-column .icon-handler.time select')
const inputName = document.querySelector('aside .personal-info-column .icon-handler.name input');
const inputEmail = document.querySelector('aside .personal-info-column .icon-handler.email input');
const inputTel = document.querySelector('aside .personal-info-column .icon-handler.phone input');

// Calculate form
class FormCalculator {
  constructor() {
    this.currentTicketType = 'permanent';
    this.totalAmount = 0;

    this.perTypeValues = {
      permanent: {
        ticketPrice: 20,
        basicTicketCounter: 0,
        seniorTicketCounter: 0,
        totalCost: 0,
      },
      temporary: {
        ticketPrice: 25,
        basicTicketCounter: 0,
        seniorTicketCounter: 0,
        totalCost: 0,
      },
      combined: {
        ticketPrice: 40,
        basicTicketCounter: 0,
        seniorTicketCounter: 0,
        totalCost: 0,
      },
    };

    this.setDate = this.setDate.bind(this);
    this.incrementor = this.incrementor.bind(this);
    this.ticketType = this.ticketType.bind(this);
  };

  setOnOpenValues(ticketType, initValues) {
    this.currentTicketType = ticketType;
    this.perTypeValues[ticketType].basicTicketCounter = initValues.basicTicketCounter;
    this.perTypeValues[ticketType].seniorTicketCounter = initValues.seniorTicketCounter;

    this.calcFormValues();
    this.setFormValues();
  }

  setDate(e) {
    let selectedDate = new Date(...e.currentTarget.value.split('-'));
    selectedDate.setMonth(selectedDate.getMonth() - 1);

    const DAYS = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'Septembe',
      'October',
      'November',
      'December'
    ]
    let formattedDate = `${DAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`;

    document.querySelector('aside .payment-info-column p').innerText = formattedDate;
  }

  setTime(e) {
    let selectedTime = e.currentTarget.value;
    document.querySelector('aside .payment-info-column p:nth-of-type(2)').innerText = selectedTime;
  }

  incrementor(e) {
    e.preventDefault();

    // Ну, хотя бы работает
    if (e.currentTarget.classList.contains('basic-plus') && this.perTypeValues[this.currentTicketType].basicTicketCounter <= 20) {
      this.perTypeValues[this.currentTicketType].basicTicketCounter++;
    }
    if (e.currentTarget.classList.contains('senior-plus') && this.perTypeValues[this.currentTicketType].basicTicketCounter <= 20) {
      this.perTypeValues[this.currentTicketType].seniorTicketCounter++;
    } 
    if (e.currentTarget.classList.contains('basic-minus') && this.perTypeValues[this.currentTicketType].basicTicketCounter > 0) {
      this.perTypeValues[this.currentTicketType].basicTicketCounter--;
    } 
    if (e.currentTarget.classList.contains('senior-minus') && this.perTypeValues[this.currentTicketType].seniorTicketCounter > 0) {
      this.perTypeValues[this.currentTicketType].seniorTicketCounter--;
    }

    this.calcFormValues();
    this.setFormValues();
  }

  ticketType(e) {
    e.preventDefault();

    this.currentTicketType = e.currentTarget.value;

    this.calcFormValues();
    this.setFormValues();
  }

  calcFormValues() {
    let tPrice = this.perTypeValues[this.currentTicketType].ticketPrice;
    let basicCounter = this.perTypeValues[this.currentTicketType].basicTicketCounter;
    let seniorCounter = this.perTypeValues[this.currentTicketType].seniorTicketCounter;

    this.perTypeValues[this.currentTicketType].totalCost = 
    tPrice * (basicCounter + seniorCounter / 2);

    if (PER_TICKET_TYPE_VALUE_CALCULATION) {
      this.totalAmount = this.perTypeValues.permanent.totalCost + this.perTypeValues.temporary.totalCost + this.perTypeValues.combined.totalCost; 
    } else {
      this.totalAmount = this.perTypeValues[this.currentTicketType].totalCost;
    }
  }

  setFormValues() {
    let tPrice = this.perTypeValues[this.currentTicketType].ticketPrice;
    let basicCounter = this.perTypeValues[this.currentTicketType].basicTicketCounter;
    let seniorCounter = this.perTypeValues[this.currentTicketType].seniorTicketCounter;
    let totalCost = this.perTypeValues[this.currentTicketType].totalCost;

    bookingForm['ticket-type'].value = this.currentTicketType;

    document.querySelector('aside .basic-cost .basic-count').innerText = basicCounter;
    document.querySelector('aside .senior-cost .senior-count').innerText = seniorCounter;

    document.getElementById('basic-form').value = basicCounter;
    document.getElementById('senior-form').value = seniorCounter;
  
    document.querySelectorAll('aside .basic-type-cost').forEach(item => item.innerText = tPrice);
    document.querySelectorAll('aside .senior-type-cost').forEach(item => item.innerText = tPrice / 2);
    
    document.querySelector('aside .basic-cost .basic-total').innerText = tPrice * basicCounter + ' €';
    document.querySelector('aside .senior-cost .senior-total').innerText = tPrice * seniorCounter / 2 + ' €';
  
    document.querySelector('aside .total-cost').innerText = this.totalAmount + ' €';
  }
}
const formCalc = new FormCalculator();

inputDate.addEventListener('change', formCalc.setDate);
inputTime.addEventListener('change', formCalc.setTime);

Array.from(bookingIncrementorBtns).forEach(elem => {
  elem.addEventListener('click', formCalc.incrementor);
});
bookingForm['ticket-type'].addEventListener('click', formCalc.ticketType);

// Open form button
buyNowBtn.addEventListener("click", event => {
  event.preventDefault();

  // Set values from tickets section
  {
    let ticketType = Array.from(ticketForm['ticket-type']).filter(item => item.checked)[0].id;
    formCalc.setOnOpenValues(ticketType, {
        basicTicketCounter: parseInt(ticketForm['basic-ticket-counter'].value),
        seniorTicketCounter: parseInt(ticketForm['senior-ticket-counter'].value)
    });
  }

  bookingTicketForm.hidden = false;
  setTimeout(() => bookingTicketFormContainer.style.left = '0', 50);
});

// Close button
closeBtn.addEventListener("click", event => {
  event.preventDefault();
  bookingTicketFormContainer.style.left = '-120vw';
  setTimeout(() => bookingTicketForm.hidden = true, 550);
});

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

  if (button.getElementsByClassName("ripple")[0]) {
    button.getElementsByClassName("ripple")[0].remove();
  }
  button.appendChild(circle);
});

// Form validation
const getToday = function() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return yyyy + '-' + mm + '-' + dd;
}
inputDate.setAttribute('min', getToday());

inputName.addEventListener('input', validateName);
inputEmail.addEventListener('input', validateEmail);
inputTel.addEventListener('input', validateTel);
bookBtn.addEventListener('click', e => {
  let nameValidated = validateName();
  let emailValidated = validateEmail();
  let telValidated = validateTel();

  if (nameValidated && emailValidated && telValidated) {
    alert("Cangrutulations, you've successfully filled the form! Now what?");
  }
});

function validateName() {
  const name = document.querySelector('aside .personal-info-column .icon-handler.name input');
  
  if (!(name.value.length >= 3 && name.value.length <= 15)) {
    showValidationError(name, "A name must contain 3-15 characters!");
  }
  else if (!Array.from(name.value).every(n => {
    n = n.charCodeAt(0);

    // 32: space, 65 - 90: A-Z, 97-122: a-z, 192-255: А-я
    return n === 32 || (n >= 65 && n <= 90) || (n >= 97 && n <= 122) || (n >= 192 && n <= 255); 
  })) {
    showValidationError(name, "A name must only contain letters of Latin, Russian alphabet or space!");
  } else {
    removeValidationError(name);
    return true;
  }
  return false;
}

function validateEmail() {
  const email = document.querySelector('aside .personal-info-column .icon-handler.email input');

  let username = email.value.slice(0, email.value.indexOf('@'));
  let firstDomain = email.value.slice(email.value.indexOf('@') + 1, email.value.lastIndexOf('.'));
  let highestDomain = email.value.slice(email.value.lastIndexOf('.') + 1, email.value.length);

  if (!email.value.includes('@')) {
    showValidationError(email, "No @ symbol!");
  }
  else if (!email.value.includes('.')) {
    showValidationError(email, "Must not have no '.' dot in an address!");
  }
  else if (firstDomain.includes('@')) {
    showValidationError(email, "Must not have >2 @ symbols!");
  }
  else if (username.length < 3 || username.length > 15 || !Array.from(username).every(n => {
    n = n.charCodeAt(0);

    // 45: -, 95: _, 48-57: 0-9, 65-90: A-Z, 97-122: a-z
    return n === 45 || n === 95 || (n >= 48 && n <= 57) || (n >= 65 && n <= 90) || (n >= 97 && n <= 122); 
  })) {
    showValidationError(email, "Incorrect username!");
  }
  else if (firstDomain.length < 4 || !Array.from(firstDomain).every(n => {
    n = n.charCodeAt(0);

    // 65-90: A-Z, 97-122: a-z
    return (n >= 65 && n <= 90) || (n >= 97 && n <= 122); 
  })) {
    showValidationError(email, "Incorrect first domain!");
  }
  else if (highestDomain.length < 2 || highestDomain.length > 3 || !Array.from(highestDomain).every(n => {
    n = n.charCodeAt(0);

    // 65-90: A-Z, 97-122: a-z
    return (n >= 65 && n <= 90) || (n >= 97 && n <= 122); 
  })) {
    showValidationError(email, "Incorrect highest domain!");
  } else {
    removeValidationError(email);
    return true;
  }
  return false;
}

function validateTel() {
  const tel = document.querySelector('aside .personal-info-column .icon-handler.phone input');

  const splitValidation = function(value, separator) {
    if (!value.includes(separator)) {}
    else if ( value.split(separator).every(n => n.length == 2) || 
              value.split(separator).every(n => n.length == 3) ) {}
    else {
      console.log(value);
      return false;
    }
    return true;
  }

  if (!tel.value) {
    showValidationError(tel, "Number must not be empty!");
  }
  else if (tel.value.split('-').join('').split(' ').join('').length > 10) {
    showValidationError(tel, "Incorrect amount of characters!");
  } else if (!tel.value.split('').every(n => {
    n = n.charCodeAt(0);

    // 48-57: 0-9, 45: -, 32: space
    return (n >= 48 && n <= 57) || n == 32 || n == 45;
  })) {
    showValidationError(tel, "Must only contain numbrers, hyphen or space!");
  }
  else if (!splitValidation(tel.value, '-') || !splitValidation(tel.value, ' ')) {
    showValidationError(tel, "Incorrect way of splitting the number");
  } else {
    removeValidationError(tel);
    return true;
  }
  return false;
}

function showValidationError(input, message) {
  removeValidationError(input);
  let error = document.createElement('div');
  error.innerText = message;
  error.className = 'error-hint';
  input.after(error);
}

function removeValidationError(input) {
  if (input.nextSibling) input.nextSibling.remove();
}