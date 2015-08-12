/* jshint strict: true, node: true */
'use strict';
var Backbone          = require('../lib/exoskeleton');

var app               = app || {};

var PreferencesModel = Backbone.Model.extend({

  urlRoot: '/preferences',

  idAttribute: '_id',

  initialize: function() {
    console.log('PreferencesModel initialize', this);
    // this.save();
  }
});
module.exports = app.PreferencesModel = new PreferencesModel({parse: true});
