"use strict";

/* global WebsyDesigns include localStorage renderPhoneDetail renderPhoneList */

/* global WebsyDesigns router */
var el = document.getElementById('all-phones');
var apiService = new WebsyDesigns.APIService('http://localhost:3000');

function renderPhoneList() {
  apiService.get('phones').then(function (phones) {
    if (router.currentParams.items.brand) {
      phones = phones.filter(function (p) {
        return p.brand === router.currentParams.items.brand;
      });
    }

    var html = phones.map(function (phone) {
      return "\n      <div class=\"card websy-trigger\" data-view=\"phonedetail?id=".concat(phone.id, "\" width=\"300px\">\n      \n      <img src=").concat(phone.image_url, " width=\"200px class=\"card--image\">\n      \n      <div class=\"card--stats\">\n          <span class=\"card--star\">").concat(phone.rating, "</span>\n      </div>\n      <p class=\"card--title\">").concat(phone.name, "</p>\n      <p class=\"card--price\"><span class=\"bold\">").concat(phone.price, "</span></p>\n      \n      </div>\n      ");
    }).join('');
    el.innerHTML = html;
  });
}

renderPhoneList();
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

function sortPhonesAtoZ() {}
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
});
/* global WebsyDesigns include router */
// class PhoneDetail {
//   constructor (elementId, options) {
//     this.elementId = elementId
//     this.options = Object.assign({}, options)
//   }
//   render () {
//     console.log(router)
//   }
// }

function renderPhoneDetail(id) {// console.log(id)
  // some kind of render function to render html of the phone that was selected with it's id
} // router initialisation


var options = {
  defaultView: 'home'
};
var router = new WebsyDesigns.Router(options);
router.on('show', function (view, params) {
  console.log(view, params);

  if (view === 'phonedetail') {
    renderPhoneDetail(params.items.id);
  }
});
router.on('hide', function (view) {
  console.log(view);
});
router.init();
var darkMode = localStorage.getItem('darkMode');
document.body.classList[darkMode === 'enabled' ? 'add' : 'remove']('dark-mode');
var switchTest = new WebsyDesigns.Switch('dark-mode'
/* this is the ID being called */
, {
  label: '☀️/🌚',
  enabled: darkMode === 'enabled',
  onToggle: function onToggle(enableDarkMode) {
    /* this is calling a function straight away */
    localStorage.setItem('darkMode', enableDarkMode ? 'enabled' : null);
    document.body.classList[enableDarkMode ? 'add' : 'remove']('dark-mode');
  }
});
var drop = new WebsyDesigns.WebsyDropdown('dropdown', {
  label: 'test',
  multiSelect: true,
  onItemSelected: function onItemSelected(item, selectedIdexes, items) {
    console.log(item, selectedIdexes, items);
    router.addUrlParams({
      test: item.test
    });
  },
  items: [{
    label: 'a',
    test: 'cat'
  }, {
    label: 'b',
    test: 'dog'
  }, {
    label: 'c',
    test: 'pizza'
  }]
});
var drop2 = new WebsyDesigns.WebsyDropdown('dropdown-2', {
  label: 'test',
  multiSelect: false,
  onItemSelected: function onItemSelected(item, selectedIdexes, items) {
    console.log(item, selectedIdexes, items);
    router.addUrlParams({
      brand: item.label
    });
    renderPhoneList();
  },
  items: [{
    label: 'Apple',
    test: 'cat'
  }, {
    label: 'Samsung',
    test: 'dog'
  }]
});
