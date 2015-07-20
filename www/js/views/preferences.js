/* jshint strict: true */
/* global Backbone */

var app = app || {};

(function() {
  'use strict';
  app.PreferencesView = Backbone.NativeView.extend({
    el: '#preferences-view',

    events: {},

    initialize: function() {
      console.log('PreferencesView initialize');
      // this.listenTo('change', this.render);
    },

    render: function() {
      console.log('PreferencesView render');
    },

  });
})();
