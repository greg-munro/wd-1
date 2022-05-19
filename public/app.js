"use strict";

/* global WebsyDesigns include */

/* global WebsyDesigns */
var el = document.getElementById('test');
var apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/');
apiService.get('phones').then(function (phones) {
  var html = phones.map(function (phone) {
    return "<h2>".concat(phone.name, "</h2>");
  });
  el.innerHTML = html;
}); // router initialisation

var options = {
  defaultView: 'home'
};
var router = new WebsyDesigns.Router(options);
router.init();
