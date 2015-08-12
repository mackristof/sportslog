/* jshint strict: true, browser: true, node: true */
'use strict';

var Backbone  = require('./lib/exoskeleton');


document.addEventListener('DOMContentLoaded', function() {
  var Router = require('./router');
  console.log('launching');
  this.router = Router;
  Backbone.history.start();
}, false);
