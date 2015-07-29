/* jshint strict: true, node: true */
var Backbone          = require('../lib/exoskeleton');
// Backbone.localStorage = require('../lib/backbone.localStorage');

var app               = app || {};

var PreferencesModel = Backbone.Model.extend({
  defaults: {
    localisation  : 'en',
    units         : 'metric',
    gender        : '',
    birthyear     : ''
  },

  // localStorage: new Backbone.localStorage('preferences'),
  url: '/preferences',

  initialize: function() {
  'use strict';
    console.log('PreferencesModel initialize');
  }
});
module.exports = app.PreferencesModel = new PreferencesModel({parse: true});
