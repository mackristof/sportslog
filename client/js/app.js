/* jshint strict: true, browser: true, node: true */

var Backbone    = require('./lib/exoskeleton');

var app         = app || {};
app.Router      = require('./router');
// app.MainView    =require('./views/main');

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  console.log('launching');
  this.router = new app.Router();
  Backbone.history.start();
  // new app.MainView({});
}, false);
