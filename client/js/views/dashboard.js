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
    this.render();

    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    console.log('DashboardView initialize', this);
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
    this.el.innerHTML = '';
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);
  },

  modelSelected: function(model) {
    this.collection.trigger('model-selected', model);
  }
});
module.exports = DashboardView;
