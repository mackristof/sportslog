/* jshint strict: true, node: true */
'use strict';

var Backbone  = require('./lib/exoskeleton');
Backbone.ajax = require('./lib/backbone.nativeajax');

var app       = app || {};
app.MainView  = require('./views/main');

var Router = Backbone.Router.extend({
  routes: {
    ''  : 'main'
  },

  main: function() {
    console.log('starting MainView');
    new app.MainView({});
  }
});
module.exports = app.Router = Router;
