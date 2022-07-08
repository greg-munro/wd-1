"use strict";

/* global
 WebsyDesigns
include 
localStorage
renderPhoneDetail 
renderPhoneList
WebsyCarousel 
*/

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
/* global WebsyDesigns localStorage */

var detail = document.getElementById('phonedetail');
var shoppingCart = document.getElementById('shopping-cart');
var countEl = document.getElementById('item-count');
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
var count = 0;
var updateCart = localStorage.getItem('updateCart');

if (updateCart !== '') {
  updateCart = JSON.parse(updateCart);
  detailService.get('phones').then(function (phones) {
    data = phones;
    updateCart.forEach(function (item) {
      return addToCart(item.id);
    }); // updateCart.forEach(item => removeFromCart(item.id))
  });
}

function addToCart(id) {
  var item = data.find(function (phone) {
    return phone.id === id;
  });
  cart.push(item);
  console.log(cart);
  shoppingCart.innerHTML += " <div class=\"cart-list\" id=\"cart".concat(item.id, "\"> <div class=\"cart-item\"> \n\n      <h3>").concat(item.name, "</h3>\n      <img src=").concat(item.image_url, " width=\"200px\">\n      <p>").concat(item.description, "</p>\n      <b><p>").concat(item.price, "</p></b>\n      <button class=\"remove-btn\" onclick=\"decrement(").concat(item.id, ")\">Remove</button>\n    </div>\n  </div>");
  localStorage.setItem('updateCart', JSON.stringify(cart));
  increment();
}

function increment() {
  count += 1;
  countEl.textContent = count;
}

function removeFromCart(id) {
  var item = data.find(function (phone) {
    return phone.id === id;
  });
  cart = cart.filter(function (item) {
    return item.id !== id;
  });
  var el = document.getElementById("cart".concat(item.id));
  el.remove();
}

function decrement(id) {
  if (count > 0) {
    count -= 1;
    countEl.textContent = count;
  }

  removeFromCart(id);
  localStorage.setItem('updateCart', JSON.stringify(cart));
} // if (count === 0) {
//   countEl.classList.toggle('test')
// }
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

var hamBtn = document.getElementById('hamburger');
var navList = document.getElementById('cent');
var rightBtns = document.getElementById('right');

function toggleButton() {
  navList.classList.toggle('show');
  rightBtns.classList.toggle('show');
}

hamBtn.addEventListener('click', toggleButton);
var optionsCarousel = {
  showPrevNext: false,
  frames: [{
    images: [{
      url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1529255238/5b1d5d879ef142125913db3a',
      style: 'background-size: cover; background-position: center;'
    }],
    text: [{
      html: "<div></div>",
      style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
      classes: 'murky-bg'
    }]
  }, {
    images: [{
      url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1601975921/18',
      style: 'background-size: cover; background-position: center;'
    }],
    text: [{
      html: "<div></div>",
      style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
      classes: 'murky-bg'
    }]
  }, {
    images: [{
      url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1529255267/5b1d5db69ef142125913db3c',
      style: 'background-size: cover; background-position: center;'
    }],
    text: [{
      html: "<div></div>",
      style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
      classes: 'murky-bg'
    }]
  }, {
    images: [{
      url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1529255498/5b1fdab3b9bab019783777de',
      style: 'background-size: cover; background-position: center;'
    }],
    text: [{
      html: "<div></div>",
      style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
      classes: 'murky-bg'
    }]
  }, {
    images: [{
      url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1536047711/ydtbcvwspuk8bkdd3tj1',
      style: 'background-size: cover; background-position: center;'
    }],
    text: [{
      html: "<div></div>",
      style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
      classes: 'murky-bg'
    }]
  }, {
    images: [{
      url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1536043081/5b8e164cb8a6df0014766a14',
      style: 'background-size: cover;background-position: center;'
    }],
    text: [{
      html: "<div></div>",
      style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
      classes: 'murky-bg'
    }]
  }]
};
var carouselHomePage = new WebsyCarousel('carousel', optionsCarousel);
