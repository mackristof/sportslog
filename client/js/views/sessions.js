/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');

var Factory       = require('../factories/factory');

// var DashboardCollection = require('../collections/dashboard');
var DocsCollection = require('../collections/docs');
// var SessionSummaryView  = require('../views/summary-session-sessions');

var SessionsView = Backbone.NativeView.extend({
  el: '#sessions-list',

  events: {},

  dom: {},

  sessions: [],

  initialize: function() {
    // this.collection = app.DashboardCollection;
    this.collection = DocsCollection;
    // this.collection.fetch();
    // this.render();
    // this.sessions = this.collection.where({type: 'session'});

    console.log('initialize Sessions View', this);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },

  renderItem: function(item) {
    item.set('session_cid', item.cid);
    console.log('just set session_cid to', item);
    /*var view = new SessionSummaryView({
      model: item
    });*/
    var view = Factory.getSessionsSummaryView(item);
    this.listenTo(item, 'sessions-item-selected', this.sessionSelected);
    this.el.appendChild(view.render().el);
  },

  render: function() {
    console.log('SESSIONS - render', this.collection);
    this.el.innerHTML = '';
    this.collection.forEach(function(item) {
/*      if (item.get('type') === 'session') {
        this.renderItem(item);
      }*/
      this.renderItem(item);
    }, this);
  },

  sessionSelected: function(session) {
    console.log('SESSIONS - item selected', session);
    this.collection.trigger('sessions-entry-selected', session);
  },
});
module.exports = SessionsView;
