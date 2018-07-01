/*jshint esversion: 6 */
// declare functions
const createNode = (element) => {
  return document.createElement(element);
};
const append = (parent, el) => {
return parent.appendChild(el);
};

const fecthRates = (base, other) => {
  message.classList.add('button', 'is-loading');
  convert.classList.add('is-loading');
  fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${base}_${other}`)
.then((response) => response.json())
.then(function(data) {
 rates = parseFloat(data.results[`${baseId.innerHTML}_${otherId.innerHTML}`].val).toFixed(4);
 message.classList.remove('button', 'is-loading');
 convert.classList.remove('is-loading');
 message.innerHTML = `1 ${basecurrency.value} = ${rates} ${othercurrency.value}`;
 otherAmount.value = '';
 baseAmount.value = '';
//  console.log(rates);
}).catch(function(err){
  console.log(err);
});
};

// declare variables
let rates;
let url;
let baseCurrency;
let otherCurrency;
const basecurrency = document.querySelector('#base-currency');
const othercurrency = document.querySelector('#other-currency');
const message = document.querySelector('#message');
const baseId = document.querySelector('#base-id');
const baseSymbol = document.querySelector('#base-symbol');
const otherId = document.querySelector('#other-id');
const otherSymbol = document.querySelector('#other-symbol');
const baseAmount = document.querySelector('#base-amount');
const otherAmount = document.querySelector('#other-amount');
const convert = document.querySelector('#convert');
const currencies = JSON.parse(data);
let results = currencies.results;

// add event listeners
basecurrency.addEventListener("change", () => {
  baseCurrency = basecurrency.value;
  message.innerHTML = `1 ${baseCurrency} = ${rates} ${otherCurrency||othercurrency.value}`;
  baseId.innerHTML = `${baseCurrency}`;
  baseSymbol.innerHTML = `${myObj[baseId.innerHTML] || ''}`;
  fecthRates(`${baseId.innerHTML}`, `${otherId.innerHTML}`);
});

othercurrency.addEventListener("change", () => {
  otherCurrency = othercurrency.value;
  message.innerHTML = `1 ${baseCurrency||basecurrency.value} = ${rates} ${otherCurrency}`;
  otherId.innerHTML = `${otherCurrency}`;
  otherSymbol.innerHTML = `${myObj[otherId.innerHTML] || ''}`;
  fecthRates(`${baseId.innerHTML}`, `${otherId.innerHTML}`);
});

 convert.addEventListener("click", () => {
   if (baseAmount.value > 0) {
    otherAmount.value = (baseAmount.value * rates).toFixed(4); 
   }
 });


let myObj = {};

let symbol;
Object.entries(results).forEach(([key,value]) => {
  // get currency symbols
  symbol = value.symbol;
  myObj[key] = value.currencySymbol;

  // create select element options and populate
  let option = createNode('option');
  let option2 = createNode('option');
  option.innerHTML = `${value.currencyName}`;
  option.value = `${value.id}`;
  option2.innerHTML = `${value.currencyName}`;
  option2.value = `${value.id}`;
  append(basecurrency, option);
  append(othercurrency, option2);
});

  baseId.innerHTML = `${basecurrency.value}`;
  otherId.innerHTML = `${othercurrency.value}`;
  baseSymbol.innerHTML = `${myObj[baseId.innerHTML] || ''}`;
  otherSymbol.innerHTML = `${myObj[otherId.innerHTML] || ''}`;
  fecthRates(`${baseId.innerHTML}`, `${otherId.innerHTML}`);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('Registration successful');
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }