/* jshint strict: true, node: true */
var Backbone          = require('../lib/exoskeleton');
// Backbone.localStorage = require('../lib/backbone.localStorage');

var app               = app || {};

var PreferencesModel = Backbone.Model.extend({
  defaults: {
    language  : 'en',
    unit      : 'metric',
    gender    : 'male',
    birthyear : '1970'
  },

  // localStorage: new Backbone.localStorage('preferences'),
  urlRoot: '/preferences',

  initialize: function() {
  'use strict';
    console.log('PreferencesModel initialize');
  }
});
module.exports = app.PreferencesModel = new PreferencesModel();
