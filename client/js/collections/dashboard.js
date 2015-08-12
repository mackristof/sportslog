/* jshint strict: true, node: true */
'use strict';

var Backbone            = require('../lib/exoskeleton');

var app                 = app || {};
app.DashboardEntryModel = require('../models/dashboard-entry');

var DashboardCollection = Backbone.Collection.extend({
  model: app.DashboardEntryModel,

  url: '/dashboard',

  initialize: function() {
    console.log('DashboardEntriesCollection initialize');
  }
});
module.exports = app.DashboardCollection = new DashboardCollection();
