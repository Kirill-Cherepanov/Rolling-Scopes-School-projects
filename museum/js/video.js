const [progress, volume] = document.querySelectorAll('.progress');

const bgChange = function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}

progress.addEventListener('input', bgChange);
volume.addEventListener('input', bgChange);