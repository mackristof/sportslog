/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
// var Template            = require('microtemplates');

var app                   = app || {};
app.DashboardCollection   = require('../collections/dashboard');
app.DashboardEntryModel   = require('../models/dashboard-entry');
app.DashboardSessionView  = require('../views/dashboard-session');
app.DashnoardMessageView  = require('../views/dashboard-message');

var DashboardView = Backbone.NativeView.extend({
  el: '#dashboard',

  events: {},

  dom: {},

  // sessionTemplate: Template('<h1>TOTO</h1>'),

  initialize: function() {
    'use strict';
    this.collection = app.DashboardCollection;
    this.collection.fetch();
    this.render();

    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);

  },

  addEntry: function() {
    'use strict';
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    'use strict';
    var view;
    if (item.attributes.type === 'session') {
      view = new app.DashboardSessionView({
        model : item
      });
      this.el.appendChild(view.render().el);
    } else if (item.attributes.type === 'message') {
      view = new app.DashboardMessageView({
        model : item
      });
      this.el.appendChild(view.render().el);
    } else {
      // TODO manage when an error generated an unknown type
      console.log('Dashboard Entry is neither session nor message');
    }
  },

  render: function() {
    'use strict';
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);

    // this.el.innerHTML = this.template(this.model.toJSON());
    // return this;
}
});
module.exports = app.DashboardView = DashboardView;
