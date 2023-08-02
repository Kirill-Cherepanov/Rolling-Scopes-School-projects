// Scroll to top
const scrollBtn = document.getElementById("scroll-to-top");
const shadeColor = function (color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};
const scrollBtnAppearanceHandler = function (e) {
  if (window.scrollY > 0) {
    scrollBtn.hidden = false;
  } else {
    scrollBtn.hidden = true;
  }

  let body = document.body,
    html = document.documentElement;
  let height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  scrollBtn.style.backgroundColor = shadeColor(
    "#9d8665",
    100 - Math.round((window.scrollY / height) * 100)
  );
};
const scrollToTop = function (e) {
  if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
    window.scrollTo(0, 0);
  }
};
scrollBtnAppearanceHandler();
document.addEventListener("scroll", scrollBtnAppearanceHandler);
scrollBtn.addEventListener("pointerdown", scrollToTop);
