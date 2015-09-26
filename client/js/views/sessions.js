/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');

// var DashboardCollection = require('../collections/dashboard');
var SessionsCollection = require('../collections/sessions');
var SessionSummaryView  = require('../views/session-summary');

var SessionsView = Backbone.NativeView.extend({
  el: '#sessions-list',

  events: {},

  dom: {},

  initialize: function() {
    // this.collection = app.DashboardCollection;
    this.collection = SessionsCollection;
    // this.collection.fetch();
    // this.render();

    console.log('initialize Sessions View', this);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },

  renderItem: function(item) {
    item.set('session_cid', item.cid);
    var view = new SessionSummaryView({
      model: item
    });
    this.el.appendChild(view.render().el);
  },

  render: function() {
    console.log('SESSIONS - render');
    this.el.innerHTML = '';
    this.collection.forEach(function(item) {
/*      if (item.get('type') === 'session') {
        this.renderItem(item);
      }*/
      this.renderItem(item);
    }, this);
  },
});
module.exports = SessionsView;
