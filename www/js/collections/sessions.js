/* jshint strict: true */
/* global Backbone */

var app = app || {};

(function() {
  'use strict';
  var SessionsCollection = Backbone.Collection.extend({
    model: app.SessionModel,

    initialize: function() {
      console.log('SessionsCollection initialize');
    }
  });
  app.SessionsCollection = new SessionsCollection();
})();
