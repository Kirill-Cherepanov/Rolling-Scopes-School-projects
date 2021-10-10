const imgOverlay = document.querySelector('.comp-overlay');
const imgContainer = document.querySelector('.comp-img');
compareImages(imgOverlay);

function compareImages(img) {
  const slider = document.querySelector('.separator-container');
  let clicked = false;
  const h = img.offsetHeight;

  slider.addEventListener("pointerdown", slideReady, {passive: false});
  window.addEventListener("pointerup", () => clicked = false);

  function slideReady(e) {
    e.preventDefault();
    clicked = true;
    window.addEventListener("pointermove", slideMove);
  }

  function slideMove(e) {
    if (clicked == false || !e.isPrimary) return false;

    let pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > 1) pos = 1;
    slide(pos);
  }

  function getCursorPos(e) {
    e = e || window.event;
    let imgPos = img.getBoundingClientRect();
    // cursor's coordinate, relative to the image considering page scrolling in %
    let cursorPos = (e.clientX - imgPos.left - window.pageXOffset) / imgContainer.offsetWidth;
    return cursorPos;
  }
  
  function slide(x) {
    img.style.width = x * 100 + "%";

    let sliderOffsetX = 20;
    if (screen.width <= 420) sliderOffsetX = 10;
    else if (screen.width <= 768) sliderOffsetX = 20;
    else if (screen.width <= 1024) sliderOffsetX = 20;

    slider.style.left = `calc(${x * 100 + "%"} - ${sliderOffsetX}px)`;
  }
}