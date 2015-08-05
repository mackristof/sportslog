/* jshint strict: true, node: true */
var Backbone  = require('../lib/exoskeleton');

var app       = app || {};

var DashboardEntryModel = Backbone.Model.extend({
  defaults: {
    date      : new Date(),
    time      : new Date(),
    activity  : '',
    distance  : 0,
    duration  : 0,
    type      : 'session'
  },

  idAttribute: '_id',

  initialize: function() {
  'use strict';
    console.log('DashboardEntryModel initialize', this);
  }
});
module.exports = app.DashboardEntryModel = DashboardEntryModel;
