/* jshint strict: true */
/* global Backbone */

var app = app || {};

(function() {
  'use strict';

  app.PreferencesModel = Backbone.Model.extend({
    defaults: {
      localisation  : 'en',
      units         : 'metric',
      gender        : '',
      birthyear     : ''
    },

    initialize: function() {
      console.log('PreferencesModel initialize');
    }
  });
})();
