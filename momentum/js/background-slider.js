const body = document.querySelector('body');
const sliderBtns = document.querySelector('.slider-icons');

if (globalSettings.imgsrc === 'github') {
  let timeOfDay = getTimeOfTheDay();
  let randomNum = Math.floor(Math.random() * 20 + 1);
  randomNum = randomNum >= 10 ? randomNum : '0' + randomNum;

  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;

  sliderBtns.addEventListener('pointerdown', e => {
    let slideNum = parseInt(body.style.backgroundImage.match(/\d\d.jpg/));

    if (e.target.classList.contains('slide-next')) slideNum = slideNum + 1 <= 20 ? slideNum + 1 : 1; 
    else slideNum = slideNum >= 1 ? slideNum - 1 : 20;

    if (slideNum < 10) slideNum = '0' + slideNum;
    slideNum = slideNum + '.jpg';

    setBg(body.style.backgroundImage.match(/url\("(.*?)"\)/)[1].replace(/\d\d.jpg/, slideNum));
  });
} else if (globalSettings.imgsrc === 'unsplash') {
  let tags = globalSettings.tags.length ? globalSettings.tags : [getTimeOfTheDay()];
  const url = `https://api.unsplash.com/search/photos?query=${tags.join('+')}&per_page=20&orientation=landscape&client_id=vS3Qw2afgVC1dyKettFrJ6hEuQ9ceHTeHflj_lkRhfs`;
  fetch(url)
    .then(r => {
      if (!r.ok) alert('Unsplash API Access error!' + r.status);
      else return r.json();
    })
    .then(r => {
      const len = r.results.length <= 20 ? r.results.length : 20;
      let slideNum = 0;
      if (r.results.length) setBg(`${r.results[slideNum].urls.raw}&w=1920&h=1080`);

      sliderBtns.addEventListener('pointerdown', e => {
        if (e.target.classList.contains('slide-next')) slideNum = slideNum + 1 < len ? slideNum + 1 : 0;
        else slideNum = slideNum >= 1 ? slideNum - 1 : len - 1;

        setBg(`${r.results[slideNum].urls.raw}&w=1920&h=1080`);
      });
    });
} else {
  if (globalSettings.language == 'en') alert("Flickr API's search algorithm is moronic. You are warned");
  else alert('Поисковый алгоритм Flickr API ужасен. Я предупредил')
  let tags = globalSettings.tags.length ? globalSettings.tags : [getTimeOfTheDay()];
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1dd4112c56f403396a5690556ab626c0&tags=${tags.join('+')}&per_page=20&format=json&nojsoncallback=1`;
  fetch(url)
    .then(r => {
      if (!r.ok) alert('Flickr API Access error!' + r.status);
      else return r.json();
    })
    .then(r => r.photos.photo)
    .then(r => {
      const len = r.len <= 20 ? r.len : 20;
      let slideNum = 0;
      let imgUrl = `https://farm${r[slideNum].farm}.staticflickr.com/${r[slideNum].server}/${r[slideNum].id}_${r[slideNum].secret}.jpg`;
      if (r.length) setBg(imgUrl);

      sliderBtns.addEventListener('pointerdown', e => {
        if (e.target.classList.contains('slide-next')) slideNum = slideNum + 1 <= len ? slideNum + 1 : 0;
        else slideNum = slideNum - 1 >= 1 ? slideNum - 1 : len;

        imgUrl = `https://farm${r[slideNum].farm}.staticflickr.com/${r[slideNum].server}/${r[slideNum].id}_${r[slideNum].secret}.jpg`;
        setBg(imgUrl);
      });
    });
}

function setBg(url) {  
  const img = new Image();
  img.src = url;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}
function getTimeOfTheDay() {
  let curHour = (new Date()).toLocaleTimeString().split(':')[0];
  if (curHour >= 0 && curHour < 6) return 'night';
  if (curHour >= 6 && curHour < 12) return 'morning';
  if (curHour >= 12 && curHour < 18) return 'afternoon';
  if (curHour >= 18) return 'evening';
}