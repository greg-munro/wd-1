"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global WebsyDesigns include */

/* global WebsyDesigns */
var List = /*#__PURE__*/_createClass(function List(elementId, options) {
  _classCallCheck(this, List);

  var DEFAULT = {};
  this.elementId = elementId;
  this.options = _extends({}, options);
  var el = document.getElementById(this.elementId);
  this.render();
});

var apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/');
var phonesList = apiService.get('phones').then(function (phonesList) {
  console.log(phonesList);
}); // router initialisation

var options = {
  defaultView: 'home'
};
var router = new WebsyDesigns.Router(options);
router.init();
