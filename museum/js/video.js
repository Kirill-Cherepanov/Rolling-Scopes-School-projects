const player = document.querySelector('#video .player');
const video = document.querySelector('#video .controls-onscreen video');
const [progress, volume] = document.querySelectorAll('#video .progress');
const onscreenPause = document.querySelector('#video .controls-onscreen .controls-pause');
const pause = document.querySelector('#video .controls-play');
const sound = document.querySelector('#video .controls-sound');
const fullscreen = document.querySelector('#video .controls-fullscreen');

// Video player
const togglePlay = function () {
  if (video.paused) {
    onscreenPause.hidden = true;
    pause.style.backgroundImage = 'url(./img/svg/pause.svg)';
    video.play();
  } else {
    onscreenPause.hidden = false;
    pause.style.backgroundImage = 'url(./img/svg/play.svg)';
    video.pause();
  }
};

const bgChange = function (target) {
  target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${target.value}%, #c4c4c4 ${target.value}%, #c4c4c4 100%)`;
};

const getToggleVolume = function () {
  let prevVolume = 50;

  return function (e) {
    if (volume.value == 0) {
      volume.value = prevVolume;
      sound.style.backgroundImage = 'url(./img/svg/sound.svg)'
    } else {
      prevVolume = volume.value;
      volume.value = 0;
      sound.style.backgroundImage = 'url(./img/svg/mute.svg)'
    }
    bgChange(volume);
    video.volume = volume.value / 100;
  }
};

const handleProgress = function () {
  progress.value = (video.currentTime / video.duration) * 100;
  bgChange(progress);

  if (progress.value == 100) {
    onscreenPause.hidden = false;
    pause.style.backgroundImage = 'url(./img/svg/play.svg)';
  }
};

const progressUpdate = function () {
  video.currentTime = progress.value / 100 * video.duration;
  bgChange(progress);
};

const volumeUpdate = function () {
  bgChange(volume);
  video.volume = this.value / 100;
  if (video.volume == 0) sound.style.backgroundImage = 'url(./img/svg/mute.svg)'
  else sound.style.backgroundImage = 'url(./img/svg/sound.svg)'
};

const toggleFullscreen = function () {
  player.requestFullscreen().then(result => {
    if (!player.classList.toggle('fullscreen')) {
      document.exitFullscreen();
    }
  });
}

onscreenPause.addEventListener('pointerdown', togglePlay);
video.addEventListener('pointerdown', togglePlay);
pause.addEventListener('pointerdown', togglePlay);
sound.addEventListener('pointerdown', getToggleVolume());
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('input', progressUpdate);
volume.addEventListener('input', volumeUpdate);
fullscreen.addEventListener('pointerdown', toggleFullscreen);

function runOnKeys(func, ...codes) {
  let pressed = new Set();

  player.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    event.preventDefault();
    func();
  });

  player.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}
runOnKeys(togglePlay, 'Space');
runOnKeys(getToggleVolume(), 'KeyM');
runOnKeys(toggleFullscreen, 'KeyF');
runOnKeys(() => video.playbackRate += 0.2, 'ShiftLeft', 'Comma');
runOnKeys(() => video.playbackRate += 0.2, 'ShiftRight', 'Comma');
runOnKeys(() => video.playbackRate -= 0.2, 'ShiftLeft', 'Period');
runOnKeys(() => video.playbackRate -= 0.2, 'ShiftRight', 'Period');
