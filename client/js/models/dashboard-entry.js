/* jshint strict: true */
/* global Backbone */

var app = app || {};

(function() {
  'use strict';

  app.DashboardEntryModel = Backbone.Model.extend({
    initialize: function() {
      console.log('DashboardEntryModel initialize');
    }
  });
})();
