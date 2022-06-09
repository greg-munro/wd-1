"use strict";

/* global WebsyDesigns include localStorage renderPhoneDetail renderPhoneList */

/* global WebsyDesigns router */
var el = document.getElementById('all-phones');
var apiService = new WebsyDesigns.APIService('http://localhost:3000');

function renderPhoneList() {
  apiService.get('phones').then(function (phones) {
    if (router.currentParams.items.brand && router.currentParams.items.brand !== '') {
      phones = phones.filter(function (p) {
        return p.brand === router.currentParams.items.brand;
      });
    }

    if (router.currentParams.items.color) {
      phones = phones.filter(function (p) {
        return p.color === router.currentParams.items.color;
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
    return "\n    <div class=\"card websy-trigger\" data-view=\"phonedetail?id=".concat(phone.id, "\">\n    <img src=").concat(phone.image_url, " width=\"200px class=\"card--image\">\n    <div class=\"card--stats\">\n        <span class=\"card--star\">").concat(phone.rating, "</span>\n    </div>\n    <p class=\"card--title\">").concat(phone.name, "</p>\n    <p class=\"card--price\"><span class=\"bold\">").concat(phone.price, "</span></p>\n    </div>\n    ");
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
    return "\n    <div class=\"card websy-trigger\" data-view=\"phonedetail?id=".concat(phone.id, "\">\n    <img src=").concat(phone.image_url, " width=\"200px class=\"card--image\">\n    <div class=\"card--stats\">\n        <span class=\"card--star\">").concat(phone.rating, "</span>\n    </div>\n    <p class=\"card--title\">").concat(phone.name, "</p>\n    <p class=\"card--price\"><span class=\"bold\">").concat(phone.price, "</span></p>\n    </div>\n    ");
  }).join('');
  samsungEl.innerHTML = html;
});
/* global WebsyDesigns */

var detail = document.getElementById('phonedetail');
var shoppingCart = document.getElementById('shopping-cart');
var detailService = new WebsyDesigns.APIService('http://localhost:3000');
var data;

function renderPhoneDetail(id) {
  detailService.get('phones').then(function (phones) {
    data = phones;
    var html = phones.filter(function (phone) {
      return phone.id === +id;
    }).map(function (phone) {
      return "<div class=\"phone-detail-card\">\n      <div class=\"card\" width=\"300px\">\n      \n      <img src=".concat(phone.image_url, " width=\"200px class=\"card--image\">\n      \n      <div class=\"card--stats\">\n          <span class=\"card--star\">").concat(phone.rating, "</span>\n      </div>\n      <p class=\"card--title\">").concat(phone.name, "</p>\n      <h3 class=\"card--price\"><span class=\"bold\">").concat(phone.price, "</span></h3>\n     <br/>\n     <button class=\"add-cart\" id=\"add-cart\" onclick=\"addToCart(").concat(phone.id, ")\"><i class=\"fa-solid fa-cart-plus\"></i>Add to cart</button>\n     <p>").concat(phone.detailed_description, "</p>\n      </div>\n      </div>\n      ");
    });
    detail.innerHTML = html;
  });
}

renderPhoneDetail(); // initiate cart

var cart = [];

function addToCart(id) {
  var item = data.find(function (phone) {
    return phone.id === id;
  });
  cart.push(item);
  console.log(cart);
  shoppingCart.innerHTML += "\n    <h1>".concat(item.name, "</h1>\n      <img src=").concat(item.image_url, " width=\"200px\">\n  ");
} // /* global WebsyDesigns include */
// include('./phoneDetail.js')
// shoppingCart.innerHTML = `<div>
// </div>`
// router initialisation


var options = {
  defaultView: 'home'
};
var router = new WebsyDesigns.Router(options);
router.on('show', function (view, params) {
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
var switchTest = new WebsyDesigns.Switch('dark-mode', {
  label: '☀️/🌙',
  enabled: darkMode === 'enabled',
  onToggle: function onToggle(enableDarkMode) {
    localStorage.setItem('darkMode', enableDarkMode ? 'enabled' : null);
    document.body.classList[enableDarkMode ? 'add' : 'remove']('dark-mode');
  }
});
var brandFilter = new WebsyDesigns.WebsyDropdown('dropdown-2', {
  label: 'Brand',
  multiSelect: true,
  onItemSelected: function onItemSelected(item, selectedIdexes, items) {
    console.log(item, selectedIdexes, items);
    router.addUrlParams({
      brand: item.label
    });
    renderPhoneList();
  },
  onClearSelected: function onClearSelected() {
    router.addUrlParams({
      brand: ''
    });
    renderPhoneList();
  },
  items: [{
    label: 'Apple'
  }, {
    label: 'Samsung'
  }]
});
var colorFilter = new WebsyDesigns.WebsyDropdown('dropdown-3', {
  label: 'Color',
  multiSelect: true,
  onItemSelected: function onItemSelected(item, selectedIdexes, items) {
    console.log(item, selectedIdexes, items);
    router.addUrlParams({
      color: item.label
    });
    renderPhoneList();
  },
  items: [{
    label: 'Black'
  }, {
    label: 'White'
  }, {
    label: 'Blue'
  }, {
    label: 'Purple'
  }, {
    label: 'Red'
  }]
});
var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling;

    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
}
