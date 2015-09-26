/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');
// var Template            = require('microtemplates');

var SessionsCollection    = require('../collections/sessions');
var SessionSummaryView    = require('./session-summary');

var DashboardView = Backbone.NativeView.extend({
  el: '#dashboard',

  events: {},

  dom: {},

  initialize: function() {
    this.collection = SessionsCollection;
    this.collection.fetch();
    // this.render();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    console.log('DashboardView initialize', this);
    // this.listenTo(this.collection, 'all', function(a, b) {console.log('DASHBOARD - this.collection', a, b);});
  },

  addEntry: function() {
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    var view = new SessionSummaryView({
      model : item
    });
    this.listenTo(item, 'selected', this.modelSelected);
    this.el.appendChild(view.render().el);
  },

  render: function() {
    console.log('DASHBOARD - render');
    this.el.innerHTML = '';
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);
  },

  modelSelected: function(model) {
    console.log('DASHBOARD model-selected triggered');
    this.collection.trigger('model-selected', model);
  }
});
module.exports = DashboardView;
