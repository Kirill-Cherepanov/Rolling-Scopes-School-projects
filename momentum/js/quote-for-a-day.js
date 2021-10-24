const quoteChanger = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data[globalSettings.language].quotes;
}

async function changeQuote() {
  const quoteArr = await getQuotes('./assets/json/quotes.json');
  let currQuoteText = quote.innerText;
  let currQuoteIndex;
  let newQuoteIndex;
  for (i of quoteArr) {
    if (currQuoteText == i.quote) currQuoteIndex = quoteArr.indexOf(i);
  }
  while (true) {
    newQuoteIndex = Math.floor(Math.random() * (quoteArr.length));
    if (newQuoteIndex !== currQuoteIndex) break;
  }
  quote.innerText = quoteArr[newQuoteIndex].quote;
  author.innerText = quoteArr[newQuoteIndex].author;
}
quoteChanger.addEventListener('pointerdown', changeQuote);
changeQuote();