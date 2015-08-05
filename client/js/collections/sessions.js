/* jshint strict: true, node: true */

var Backbone          = require('../lib/exoskeleton');
// Backbone.localStorage = require('../lib/backbone.localStorage');

var app               = app || {};
app.SessionModel      = require('../models/session');

var SessionsCollection = Backbone.Collection.extend({
  model: app.SessionModel,
  // localStorage: new Backbone.localStorage('sessions'),
  url: '/sessions',

  initialize: function() {
    'use strict';
    console.log('SessionsCollection initialize');
  },
});
module.exports = app.SessionsCollection =  new SessionsCollection();
