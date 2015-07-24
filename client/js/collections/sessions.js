/* jshint strict: true, node: true */

var Backbone      = require('../lib/exoskeleton');

var app           = app || {};
app.SessionModel  = require('../models/session');

var SessionsCollection = Backbone.Collection.extend({
  model: app.SessionModel,
  url: '/sessions',
});
module.exports = app.SessionsCollection =  new SessionsCollection();
