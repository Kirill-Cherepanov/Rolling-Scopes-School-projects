const settingsBtn = document.querySelector('.settings');
const settingsForm = document.querySelector('.settings-form');
const langSelect = document.getElementById('lang');
const imgSource = document.querySelectorAll('input[name="img-src"]');
const tagInput = document.getElementById('add-tag');
const tagsField = document.querySelector('.tags-field');
const blockSelect = document.getElementById('hide-blocks');
const hiddenBlocks = JSON.parse(localStorage.getItem('hiddenBlocks')) || [];
let tags = JSON.parse(localStorage.getItem('imgtags')) || [];

// Toggle menu
settingsBtn.addEventListener('pointerdown', () => settingsForm.classList.toggle('active'));

// Language change
langSelect.addEventListener('change', () => localStorage.setItem('lang', langSelect.value));

// Image source change
Array.from(imgSource).forEach(i => {
  i.addEventListener('change', () => localStorage.setItem('imgsrc', i.id));
});

// Tagfield and tags search change
const addTag = function(text) {
  const newTag = document.createElement('div');
  newTag.classList.add('tag');
  newTag.textContent = text;
  newTag.addEventListener('pointerdown', () => {
    tags.splice(tags.indexOf(newTag.textContent), 1);
    newTag.remove();
    localStorage.setItem('imgtags', JSON.stringify(tags));
  });
  tagsField.append(newTag);
}
tagInput.addEventListener('change', () => {
  if (!tagInput.value) return;
  addTag(tagInput.value);
  tags.push(tagInput.value);
  localStorage.setItem('imgtags', JSON.stringify(tags));
});

// Hide / Show blocks
blockSelect.addEventListener('change', () => {
  const hiddenBlocks = Array.from(blockSelect.children).filter(i => i.selected).map(i => i.value);

  localStorage.setItem('hiddenBlocks', JSON.stringify(hiddenBlocks));
});

// Set default local storage values
if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');
if (!localStorage.getItem('imgsrc')) localStorage.setItem('imgsrc', 'github');

// Set initial values
langSelect.value = localStorage.getItem('lang');
Array.from(imgSource).forEach(i => { 
  if (i.id === localStorage.getItem('imgsrc')) i.checked = true;
});
for (t of tags) addTag(t);
if (hiddenBlocks.includes('time-date')) {
  document.querySelector(`time.time`).style.opacity = '0';
  document.querySelector(`time.time`).style.pointerEvents = 'none';
  document.querySelector(`date.date`).style.opacity = '0';
  document.querySelector(`date.date`).style.pointerEvents = 'none';
}
for (b of hiddenBlocks) {
  Array.from(blockSelect.children).filter(i => i.value === b)[0].selected = true;
  if (b != 'time-date') {
    document.querySelector(`.${b}`).style.opacity = '0';
    document.querySelector(`.${b}`).style.pointerEvents = 'none';
  }
}

// Set a variable for Global Settings
const globalSettings = {
  language: localStorage.getItem('lang'),
  imgsrc: localStorage.getItem('imgsrc'),
  tags: tags,
};

// Translating the Settings
const langLabel = document.querySelector('.language-change label[for="lang"]');
const imgSrcLabel = document.querySelector('.img-source-label');
const submitNotice = document.querySelector('.submit-notice p');
const hideBLocksLabel = document.querySelector('.hide-blocks label[for="hide-blocks"]');

if (globalSettings.language === 'ru') {
  langLabel.textContent = 'Выберите предпочитаемый язык:';
  langSelect[0].textContent = 'Английский';
  langSelect[1].textContent = 'Русский';
  imgSrcLabel.textContent = 'Выберите метод поиска картинок';
  tagInput.placeholder = 'Введите тег для поиска картинок';
  submitNotice.textContent = 'Перезагрузите страницу для применения настроек';
  hideBLocksLabel.textContent = 'CTRL + Клик чтобы спрятать блоки:';
}