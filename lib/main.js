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

var fecthRates = function fecthRates(base, other) {
  message.classList.add('button', 'is-loading');
  convert.classList.add('is-loading');
  fetch('https://free.currencyconverterapi.com/api/v5/convert?q=' + base + '_' + other).then(function (response) {
    return response.json();
  }).then(function (data) {
    rates = parseFloat(data.results[baseId.innerHTML + '_' + otherId.innerHTML].val).toFixed(4);
    message.classList.remove('button', 'is-loading');
    convert.classList.remove('is-loading');
    message.innerHTML = '1 ' + basecurrency.value + ' = ' + rates + ' ' + othercurrency.value;
    otherAmount.value = '';
    baseAmount.value = '';
    console.log(rates);
  }).catch(function (err) {
    console.log(err);
  });
};

// declare variables
var rates = void 0;
var url = void 0;
var baseCurrency = void 0;
var otherCurrency = void 0;
var basecurrency = document.querySelector('#base-currency');
var othercurrency = document.querySelector('#other-currency');
var message = document.querySelector('#message');
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
  message.innerHTML = '1 ' + baseCurrency + ' = ' + rates + ' ' + (otherCurrency || othercurrency.value);
  baseId.innerHTML = '' + baseCurrency;
  baseSymbol.innerHTML = '' + (myObj[baseId.innerHTML] || '');
  fecthRates('' + baseId.innerHTML, '' + otherId.innerHTML);
});

othercurrency.addEventListener("change", function () {
  otherCurrency = othercurrency.value;
  message.innerHTML = '1 ' + (baseCurrency || basecurrency.value) + ' = ' + rates + ' ' + otherCurrency;
  otherId.innerHTML = '' + otherCurrency;
  otherSymbol.innerHTML = '' + (myObj[otherId.innerHTML] || '');
  fecthRates('' + baseId.innerHTML, '' + otherId.innerHTML);
});

convert.addEventListener("click", function () {
  if (baseAmount.value > 0) {
    otherAmount.value = baseAmount.value * rates;
  }
});

var myObj = {};

var symbol = void 0;
Object.entries(results).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  // get currency symbols
  symbol = value.symbol;
  myObj[key] = value.currencySymbol;

  // create select element options and populate
  var option = createNode('option');
  var option2 = createNode('option');
  option.innerHTML = '' + value.currencyName;
  option.value = '' + value.id;
  option2.innerHTML = '' + value.currencyName;
  option2.value = '' + value.id;
  append(basecurrency, option);
  append(othercurrency, option2);
});

baseId.innerHTML = '' + basecurrency.value;
otherId.innerHTML = '' + othercurrency.value;
baseSymbol.innerHTML = '' + (myObj[baseId.innerHTML] || '');
otherSymbol.innerHTML = '' + (myObj[otherId.innerHTML] || '');
fecthRates('' + baseId.innerHTML, '' + otherId.innerHTML);