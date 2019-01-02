'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/*jshint esversion: 6 */
// declare functions
var createNode = function createNode(element) {
  return document.createElement(element);
};
var append = function append(parent, el) {
  return parent.appendChild(el);
};

var displayResults = function displayResults(rates) {
  message.innerHTML = '1 ' + basecurrency.value + ' = ' + rates.toFixed(4) + ' ' + othercurrency.value;
  inverse.innerHTML = '1 ' + othercurrency.value + ' = ' + parseFloat(1 / rates).toFixed(4) + ' ' + basecurrency.value;
  otherAmount.value = '';
  baseAmount.value = '';
};

var fecthRates = function fecthRates(base, other) {
  if (base == other) {
    rates = 1;
    displayResults(rates);
  } else {
    fetch('https://free.currencyconverterapi.com/api/v5/convert?q=' + base + '_' + other).then(function (response) {
      return response.json();
    }).then(function (data) {
      rates = parseFloat(data.results[baseId.innerHTML + '_' + otherId.innerHTML].val);
      displayResults(rates);
    }).catch(function (err) {
      console.log(err);
    });
  }
};

// declare variables
var rates = void 0;
var url = void 0;
var baseCurrency = void 0;
var otherCurrency = void 0;
var basecurrency = document.querySelector('#base-currency');
var othercurrency = document.querySelector('#other-currency');
var message = document.querySelector('#message');
var inverse = document.querySelector('#inverse');
var baseId = document.querySelector('#base-id');
var baseSymbol = document.querySelector('#base-symbol');
var otherId = document.querySelector('#other-id');
var otherSymbol = document.querySelector('#other-symbol');
var baseAmount = document.querySelector('#base-amount');
var otherAmount = document.querySelector('#other-amount');
var convert = document.querySelector('#convert');
var currencies = JSON.parse(data);
var results = currencies.results;

// add event listeners
basecurrency.addEventListener("change", function () {
  baseCurrency = basecurrency.value;
  baseId.innerHTML = '' + baseCurrency;
  baseSymbol.innerHTML = '' + (myObj[baseId.innerHTML] || '');
  fecthRates('' + baseId.innerHTML, '' + otherId.innerHTML);
});

othercurrency.addEventListener("change", function () {
  otherCurrency = othercurrency.value;
  otherId.innerHTML = '' + otherCurrency;
  otherSymbol.innerHTML = '' + (myObj[otherId.innerHTML] || '');
  fecthRates('' + baseId.innerHTML, '' + otherId.innerHTML);
});

convert.addEventListener("click", function () {
  setTimeout(function () {
    if (baseAmount.value) {
      otherAmount.value = (baseAmount.value * rates).toFixed(4);
      inverse.innerHTML = baseAmount.value + ' ' + othercurrency.value + ' = ' + parseFloat(1 / rates * baseAmount.value).toFixed(4) + ' ' + basecurrency.value;
    }
  }, 500);
});

var myObj = {};
var currencyArray = [];
// let symbol;
Object.entries(results).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  // get currency symbols
  // symbol = value.symbol;
  myObj[key] = value.currencySymbol;

  var currencyDetails = [];
  currencyDetails.push(value.currencyName, value.id, value.currencySymbol);
  currencyArray.push(currencyDetails);
});

currencyArray = currencyArray.sort();
currencyArray.map(function (e) {
  // create select element options and populate
  var option = createNode('option');
  var option2 = createNode('option');
  option.innerHTML = '' + e[0];
  option.value = '' + e[1];
  option2.innerHTML = '' + e[0];
  option2.value = '' + e[1];
  append(basecurrency, option);
  append(othercurrency, option2);
});

baseId.innerHTML = '' + basecurrency.value;
otherId.innerHTML = '' + othercurrency.value;
baseSymbol.innerHTML = '' + (myObj[baseId.innerHTML] || '');
otherSymbol.innerHTML = '' + (myObj[otherId.innerHTML] || '');
fecthRates('' + baseId.innerHTML, '' + otherId.innerHTML);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function () {
    console.log('Registration successful');
  }).catch(function (error) {
    console.log('Service worker registration failed. Error:', error);
  });
}

var key = 'STORE_KEY';
// var value = 'What we save offline';
var value = 'yusuf';

localforage.setItem(key, value, function () {
  console.log('Using:' + localforage.driver());
  console.log('Saved: ' + value);
});
localforage.getItem(key).then(function (readValue) {
  console.log('Read: ', readValue);
});