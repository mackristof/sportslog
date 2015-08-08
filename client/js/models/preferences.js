/* jshint strict: true, node: true */
var Backbone          = require('../lib/exoskeleton');

var app               = app || {};

var PreferencesModel = Backbone.Model.extend({

  urlRoot: '/preferences',

  idAttribute: '_id',

  initialize: function() {
    'use strict';
    console.log('PreferencesModel initialize', this);
    // this.save();
  }
});
module.exports = app.PreferencesModel = new PreferencesModel({parse: true});
