import playList from "./play-list.js";

const trackTitle = document.querySelector('.track-name');
const playBtn = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const duration = document.querySelector('.duration');
const currTime = document.querySelector('.current-time');
const progress = document.querySelector('.progress-bar');
const progressFiller = document.querySelector('.progress-bar-filler');
const volume = document.querySelector('.volume-bar');
const volumeFiller = document.querySelector('.volume-bar-filler');
const muteBtn = document.querySelector('.mute');
const playListHTML = document.querySelector('.play-list');
const player = new Audio();
let isOn = false; 
let currSoundtrack = 0;

function initPlayer() {
  if (currSoundtrack === 4) currSoundtrack = 0;
  if (currSoundtrack === -1) currSoundtrack = 3;
  player.src = playList[currSoundtrack].src;
  player.currentTime = 0;
  trackTitle.textContent = playList[currSoundtrack].title;
  duration.textContent = playList[currSoundtrack].duration;
}
function togglePlay() {
  if (isOn) player.pause();
  else player.play();
  isOn = !isOn;
  playBtn.classList.toggle('pause');
  playListHTML.children[currSoundtrack].classList.toggle('item-active');
}
function changeSoundtrack(nextTrack) {
  playListHTML.children[currSoundtrack].classList.remove('item-active');
  currSoundtrack = nextTrack;
  initPlayer();
  isOn = false;
  playBtn.classList.remove('pause');
  togglePlay();
}
function changeProgress(e) {
  const clickPos = e.offsetX;
  player.currentTime = Math.floor(player.duration * clickPos / parseInt(getComputedStyle(progress).width));
  progressFiller.style.width = clickPos + 'px';
}
function trackProgress() {
  progressFiller.style.width = parseInt(getComputedStyle(progress).width) * player.currentTime / player.duration + 'px';
  currTime.textContent = getTimeCodeFromNum(player.currentTime);
  if (player.currentTime == player.duration) {
    changeSoundtrack(currSoundtrack + 1);
  }
}
function toggleMute() {
  player.muted = !player.muted;
  muteBtn.classList.toggle('muted');
}
function changeVolume(e) {
  const clickPos = e.offsetX;
  player.volume = clickPos / parseInt(getComputedStyle(volume).width);
  volumeFiller.style.width = clickPos + 'px';
}

playBtn.addEventListener('pointerdown', togglePlay);
playPrev.addEventListener('pointerdown', () => changeSoundtrack(currSoundtrack - 1));
playNext.addEventListener('pointerdown', () => changeSoundtrack(currSoundtrack + 1));
progress.addEventListener('pointerdown', changeProgress);
volume.addEventListener('pointerdown', changeVolume);
muteBtn.addEventListener('pointerdown', toggleMute);
playListHTML.addEventListener('pointerdown', (e) => {
  const nextTrack = Array.from(playListHTML.children).indexOf(e.target);
  if (currSoundtrack === nextTrack) { 
    togglePlay(); 
    return; 
  }
  changeSoundtrack(nextTrack);
});

initPlayer();
setInterval(trackProgress, 200);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
