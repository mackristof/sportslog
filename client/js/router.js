/* jshint strict: true, node: true */

var Backbone  = require('./lib/exoskeleton');
Backbone.ajax = require('./lib/backbone.nativeajax');

var app       = app || {};
app.MainView  = require('./views/main');

var Router = Backbone.Router.extend({
  routes: {
    ''  : 'main'
  },

  main: function() {
    'use strict';
    console.log('starting MainView');
    new app.MainView({});
  }
});
module.exports = app.Router = Router;
