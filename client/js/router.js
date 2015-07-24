/* jshint strict: true, node: true */
var Backbone = require('./lib/exoskeleton');
// var Backbone = require('backbone');

var app = app || {};
app.MainView = require('./views/main');
app.SessionsCollection = require('./collections/sessions');

app.Router = Backbone.Router.extend({
  routes: {
    ''  : 'main'
  },

  main: function() {
    'use strict';
    var MainView = new app.MainView({
      collection: new app.SessionsCollection()
    });
    MainView.render();
  }
});
module.exports = app.Router;
