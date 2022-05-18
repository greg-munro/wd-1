"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global WebsyDesigns include TopMenu */

/* global getPageContents navController */
var TopMenu = /*#__PURE__*/function () {
  function TopMenu(elementId, options) {
    _classCallCheck(this, TopMenu);

    var el = document.getElementById(elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.innerHTML = "\n        <div class=\"dpg-top-menu\">\n          <div id=\"campaignDropdown\" class=\"top-menu-campaign\"></div>  \n          <button data-view=\"usermenu\" data-group=\"usermenu\" class=\"trigger-toggle trigger-item user-menu-button\"></button>\n          <div class=\"view card dpg-user-menu\" id=\"userMenu\" data-view=\"usermenu\" data-group=\"usermenu\">\n            <div data-view=\"usermenu\" data-group=\"usermenu\" class=\"trigger-toggle trigger-item top-menu-mask\"></div>\n            <ul>\n              <li class=\"user-menu-item logout\">\n                <a href=\"prelogout\">\n                  Logout\n                  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 512 512\"><title>ionicons-v5-o</title><path d=\"M304,336v40a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V136a40,40,0,0,1,40-40H256c22.09,0,48,17.91,48,40v40\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><polyline points=\"368 336 448 256 368 176\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"176\" y1=\"256\" x2=\"432\" y2=\"256\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>\n                </a>\n              </li>\n            <ul>\n          </div>\n        </div>\n      ";
    }
  }

  _createClass(TopMenu, [{
    key: "handleClick",
    value: function handleClick(event) {// if (event.target.classList.contains('top-menu-mask')) {
      //   navController.navigate('usermenu', 'usermenu', true)      
      // }
    }
  }]);

  return TopMenu;
}();

var options = {
  defaultView: 'home'
};
var router = new WebsyDesigns.Router(options);
router.init();
var apiService = new WebsyDesigns.APIService('https://ticketmasterstefan-skliarovv1.p.rapidapi.com/getEventOffers');
console.log(apiService);
