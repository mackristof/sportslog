/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');

var app                 = app || {};
// app.DashboardCollection = require('../collections/dashboard');
app.SessionsCollection = require('../collections/sessions');
app.SessionSummaryView  = require('../views/session-summary');

var SessionsView = Backbone.NativeView.extend({
  el: '#sessions-view',

  events: {},

  dom: {},

  initialize: function() {
    // this.collection = app.DashboardCollection;
    this.collection = app.SessionsCollection;
    this.collection.fetch();
    this.render();

    console.log('initialize Sessions View', this);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },

  renderItem: function(item) {
    item.set('session_cid', item.cid);
    var view = new app.SessionSummaryView({
      model: item
    });
    this.el.appendChild(view.render().el);
  },

  render: function() {
    this.el.innerHTML = '';
    this.collection.forEach(function(item) {
/*      if (item.get('type') === 'session') {
        this.renderItem(item);
      }*/
      this.renderItem(item);
    }, this);
  },
});
module.exports = app.SessionsView = SessionsView;
