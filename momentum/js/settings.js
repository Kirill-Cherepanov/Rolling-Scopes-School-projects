const settingsBtn = document.querySelector('.settings');
const settingsForm = document.querySelector('.settings-form');
const langSelect = document.getElementById('lang');
const imgSource = document.querySelectorAll('input[name="img-src"]');
const tagInput = document.getElementById('add-tag');
const tagsField = document.querySelector('.tags-field');
let tags = JSON.parse(localStorage.getItem('imgtags')) || [];

settingsBtn.addEventListener('pointerdown', () => settingsForm.classList.toggle('active'));

langSelect.addEventListener('change', () => {
  localStorage.setItem('lang', langSelect.value);
});
Array.from(imgSource).forEach(i => {
  i.addEventListener('change', () => {
    localStorage.setItem('imgsrc', i.id);
  });
});
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

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');
if (!localStorage.getItem('imgsrc')) localStorage.setItem('imgsrc', 'github');

// Set init values
langSelect.value = localStorage.getItem('lang');
Array.from(imgSource).forEach(i => { 
  if (i.id === localStorage.getItem('imgsrc')) {
    i.checked = true; 
  }
});
for (t of tags) addTag(t);
const globalSettings = {
  language: localStorage.getItem('lang'),
  imgsrc: localStorage.getItem('imgsrc'),
  tags: tags,
};

// Translating the Settings
const langLabel = document.querySelector('.language-change label[for="lang"]');
const imgSrcLabel = document.querySelector('.img-source-label');
const submitNotice = document.querySelector('.submit-notice p');

if (globalSettings.language === 'ru') {
  langLabel.textContent = 'Выберите предпочитаемый язык:';
  langSelect[0].textContent = 'Английский';
  langSelect[1].textContent = 'Русский';
  imgSrcLabel.textContent = 'Выберите метод поиска картинок';
  tagInput.placeholder = 'Введите тег для поиска картинок';
  submitNotice.textContent = 'Перезагрузите страницу для применения настроек';
}