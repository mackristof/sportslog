/* jshint strict: true, node: true */
'use strict';
var Backbone  = require('../lib/exoskeleton');

var app       = app || {};

var DashboardEntryModel = Backbone.Model.extend({
/*  defaults: {
    date      : new Date(),
    time      : new Date(),
    activity  : '',
    distance  : 0,
    duration  : 0,
    type      : 'session'
  },*/

  idAttribute: '_id',

  initialize: function() {
    // console.log('DashboardEntryModel initialize', this);
  }
});
module.exports = app.DashboardEntryModel = DashboardEntryModel;
