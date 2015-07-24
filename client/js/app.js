/* jshint strict: true, browser: true, node: true */

var Backbone    = require('./lib/exoskeleton');

var app         = app || {};
var app.Router  = require('./router');

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  console.log('launching');
  this.router = new app.Router();
  Backbone.history.start();
}, false);
