/* jshint strict: true, node: true */
var Backbone  = require('../lib/exoskeleton');

var app       = app || {};

var DashboardEntryModel = Backbone.Model.extend({
  initialize: function() {
  'use strict';
    console.log('DashboardEntryModel initialize');
  }
});
module.exports = app.DashboardEntryModel = DashboardEntryModel;
