/* jshint strict: true, node: true */
'use strict';

var Backbone            = require('../lib/exoskeleton');

var DashboardEntryModel = require('../models/dashboard-entry');

var DashboardCollection = Backbone.Collection.extend({
  model: DashboardEntryModel,

  url: '/dashboard',

  initialize: function() {
    console.log('DashboardEntriesCollection initialize');
  }
});
module.exports = new DashboardCollection();
