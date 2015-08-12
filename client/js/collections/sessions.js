/* jshint strict: true, node: true */
'use strict';

var Backbone      = require('../lib/exoskeleton');

var app           = app || {};
app.SessionModel  = require('../models/session');

var SessionsCollection = Backbone.Collection.extend({
  model: app.SessionModel,

  url: '/sessions',

  initialize: function() {
    console.log('SessionsCollection initialize');
  },
});
module.exports = app.SessionsCollection =  new SessionsCollection();
