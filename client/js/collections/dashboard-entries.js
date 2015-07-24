/* jshint strict: true */
/* global Backbone */

var app = app || {};

(function() {
  'use strict';

  var DashboardEntriesCollection = Backbone.Collection.extend({
    model: app.DashboardEntryModel,

    initialize: function() {
      console.log('DashboardEntriesCollection initialize');
    }
  });
  app.DashboardEntriesCollection = new DashboardEntriesCollection();
})();
