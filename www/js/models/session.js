/* jshint strict: true */
/* global Backbone */

var app = app || {};

(function() {
  'use strict';

  app.SessionModel = Backbone.Model.extend({
    initialize: function() {
      console.log('SessionModel initialize');
    }
  });
})();
