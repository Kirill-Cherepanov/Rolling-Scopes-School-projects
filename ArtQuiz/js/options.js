const muteBtn = document.querySelector('.mute');
const volume = document.getElementById('volume');
const timer = document.getElementById('time');


// Init values
console.log(Boolean(Number(localStorage.getItem('muted'))));
if (!localStorage.getItem('volume')) localStorage.setItem('volume', '100');
else volume.value = localStorage.getItem('volume');
if (!localStorage.getItem('muted')) localStorage.setItem('muted', '0');
else if (Boolean(Number(localStorage.getItem('muted')))) {
  muteBtn.classList.toggle('muted');
}
if (!localStorage.getItem('timer')) localStorage.setItem('timer', '0');
else 

// EventListeners
muteBtn.addEventListener('pointerdown', () => {
  let muted = !Boolean(Number(localStorage.getItem('muted')));
  localStorage.setItem('muted', muted ? '1' : '0');
  muteBtn.classList.toggle('muted');
});
volume.addEventListener('input', () => localStorage.setItem('volume', volume.value));
timer.addEventListener('change', () => localStorage.setItem('timer', timer.value));
