/* jshint strict: true, node: true */

var Backbone            = require('../lib/exoskeleton');
// Backbone.localStorage    = require('../lib/backbone.localStorage');

var app                 = app || {};
app.DashboardEntryModel = require('../models/dashboard-entry');

var DashboardEntriesCollection = Backbone.Collection.extend({
  model: app.DashboardEntryModel,

  // localStorage: new Backbone.localStorage('dashboard'),
  url: '/dashboard',

  initialize: function() {
    'use strict';
    console.log('DashboardEntriesCollection initialize');
  }
});
module.exports = app.DashboardEntriesCollection = new DashboardEntriesCollection();
