/*jshint esversion: 6 */
// declare functions
const createNode = (element) => {
  return document.createElement(element);
};
const append = (parent, el) => {
return parent.appendChild(el);
};

const displayResults= (rates) => {
  message.innerHTML = `1 ${basecurrency.value} = ${rates.toFixed(4)} ${othercurrency.value}`;
 inverse.innerHTML = `1 ${othercurrency.value} = ${parseFloat(1 / rates).toFixed(4)} ${basecurrency.value}`;
 otherAmount.value = '';
 baseAmount.value = '';
}

const fecthRates = (base, other) => {
  if (base == other) {
    rates = 1;
    displayResults(rates)
  }
  else {
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${base}_${other}`)
.then((response) => response.json())
.then(function(data) {
 rates = parseFloat(data.results[`${baseId.innerHTML}_${otherId.innerHTML}`].val);
 displayResults(rates);
}).catch(function(err){
  console.log(err);
});  
  }
  
};

// declare variables
let rates;
let url;
let baseCurrency;
let otherCurrency;
const basecurrency = document.querySelector('#base-currency');
const othercurrency = document.querySelector('#other-currency');
const message = document.querySelector('#message');
const inverse = document.querySelector('#inverse')
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
  baseId.innerHTML = `${baseCurrency}`;
  baseSymbol.innerHTML = `${myObj[baseId.innerHTML] || ''}`;
  fecthRates(`${baseId.innerHTML}`, `${otherId.innerHTML}`);
});

othercurrency.addEventListener("change", () => {
  otherCurrency = othercurrency.value;
  otherId.innerHTML = `${otherCurrency}`;
  otherSymbol.innerHTML = `${myObj[otherId.innerHTML] || ''}`;
  fecthRates(`${baseId.innerHTML}`, `${otherId.innerHTML}`);
});

 convert.addEventListener("click", () => {
  setTimeout(() => {
    if (baseAmount.value) {
      otherAmount.value = (baseAmount.value * rates).toFixed(4);
      inverse.innerHTML = `${baseAmount.value} ${othercurrency.value} = ${parseFloat(1 / rates * baseAmount.value).toFixed(4)} ${basecurrency.value}`;
     }
  }, 500);
   
 });


let myObj = {};
let currencyArray = [];
// let symbol;
Object.entries(results).forEach(([key,value]) => {
  // get currency symbols
  // symbol = value.symbol;
  myObj[key] = value.currencySymbol;

  let currencyDetails = [];
  currencyDetails.push(value.currencyName, value.id, value.currencySymbol);
  currencyArray.push(currencyDetails);
  
});

currencyArray = currencyArray.sort();
currencyArray.map((e) => {
  // create select element options and populate
  let option = createNode('option');
  let option2 = createNode('option');
  option.innerHTML = `${e[0]}`;
  option.value = `${e[1]}`;
  option2.innerHTML = `${e[0]}`;
  option2.value = `${e[1]}`;
  append(basecurrency, option);
  append(othercurrency, option2);
})

  baseId.innerHTML = `${basecurrency.value}`;
  otherId.innerHTML = `${othercurrency.value}`;
  baseSymbol.innerHTML = `${myObj[baseId.innerHTML] || ''}`;
  otherSymbol.innerHTML = `${myObj[otherId.innerHTML] || ''}`;
  fecthRates(`${baseId.innerHTML}`, `${otherId.innerHTML}`);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function() {
      console.log('Registration successful');
    })
    .catch(function(error) {
      console.log('Service worker registration failed. Error:', error);
    });
  }


var key = 'STORE_KEY';
// var value = 'What we save offline';
var value = 'yusuf';

localforage.setItem(key, value, function() {
  console.log('Using:' + localforage.driver());
  console.log('Saved: ' + value);
});  
localforage.getItem(key).then(function(readValue) {
  console.log('Read: ', readValue);
});