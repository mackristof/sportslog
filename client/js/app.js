/* jshint strict: true, browser: true, node: true */

// var Backbone = require('./lib/exoskeleton');

var app = app || {};

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  console.log('launching');

/*  app.Router = require('./router');
  this.router = new app.Router();

  Backbone.history.start();*/
  app.MainView = require('./views/main');
  new app.MainView();

}, false);
