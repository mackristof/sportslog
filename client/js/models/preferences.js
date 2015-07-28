/* jshint strict: true, node: true */
var Backbone  = require('../lib/exoskeleton');

var app       = app || {};

var PreferencesModel = Backbone.Model.extend({
  defaults: {
    localisation  : 'en',
    units         : 'metric',
    gender        : '',
    birthyear     : ''
  },

  url: '/preferences',

  initialize: function() {
  'use strict';
    console.log('PreferencesModel initialize');
  }
});
module.exports = app.PreferencesModel = new PreferencesModel({parse: true});
