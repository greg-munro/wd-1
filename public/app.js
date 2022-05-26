"use strict";

/* global WebsyDesigns include localStorage */

/* global WebsyDesigns */
var el = document.getElementById('all-phones');
var apiService = new WebsyDesigns.APIService('http://localhost:3000');
apiService.get('phones').then(function (phones) {
  var html = phones.map(function (phone) {
    return "\n    <div class=\"card\" width=\"300px\">\n    \n    <img src=".concat(phone.image_url, " width=\"200px class=\"card--image\">\n    \n    <div class=\"card--stats\">\n        <span class=\"card--star\">").concat(phone.rating, "</span>\n    </div>\n    <p class=\"card--title\">").concat(phone.name, "</p>\n    <p class=\"card--price\"><span class=\"bold\">").concat(phone.price, "</span></p>\n    \n    </div>\n    ");
  }).join('');
  el.innerHTML = html;
});
/* global WebsyDesigns */

var appleEl = document.getElementById('apple-phones');
var appleService = new WebsyDesigns.APIService('http://localhost:3000');
appleService.get('phones').then(function (phones) {
  var html = phones.filter(function (phone) {
    return phone.brand === 'Apple';
  }).map(function (phone) {
    return "\n    <div class=\"card\">\n    <img src=".concat(phone.image_url, " width=\"200px class=\"card--image\">\n    <div class=\"card--stats\">\n        <span class=\"card--star\">").concat(phone.rating, "</span>\n    </div>\n    <p class=\"card--title\">").concat(phone.name, "</p>\n    <p class=\"card--price\"><span class=\"bold\">").concat(phone.price, "</span></p>\n    </div>\n    ");
  }).join('');
  appleEl.innerHTML = html;
});
/* global WebsyDesigns */

var samsungEl = document.getElementById('samsung-phones');
var samsungService = new WebsyDesigns.APIService('http://localhost:3000');
samsungService.get('phones').then(function (phones) {
  var html = phones.filter(function (phone) {
    return phone.brand === 'Samsung';
  }).map(function (phone) {
    return "\n    <div class=\"card\">\n    <img src=".concat(phone.image_url, " width=\"200px class=\"card--image\">\n    <div class=\"card--stats\">\n        <span class=\"card--star\">").concat(phone.rating, "</span>\n    </div>\n    <p class=\"card--title\">").concat(phone.name, "</p>\n    <p class=\"card--price\"><span class=\"bold\">").concat(phone.price, "</span></p>\n    </div>\n    ");
  }).join('');
  samsungEl.innerHTML = html;
}); // router initialisation

var options = {
  defaultView: 'home'
};
var router = new WebsyDesigns.Router(options);
router.init();
var darkMode = localStorage.getItem('darkMode');
var switchTest = new WebsyDesigns.Switch('dark-mode'
/* this is the ID being called */
, {
  label: '☀️/🌚',
  onToggle: function onToggle(enableDarkMode) {
    /* this is calling a function straight away */
    localStorage.setItem('darkMode', enableDarkMode ? 'enabled' : null);
    document.body.classList[enableDarkMode ? 'add' : 'remove']('dark-mode');
  }
}); // const drop = new WebsyDesigns.WebsyDropdown('dropdown')
