/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.DashboardCollection = require('../collections/dashboard');

var DashboardView = Backbone.NativeView.extend({
  tagName: 'li',

  events: {},

  dom: {},

  sessionTemplate: Template('<img src="img/activities/<%= content.activity %>.svg" alt="running" class="activity"><div class="time"><%= content.date %></div><div class="distance"><span class="fa fa-road"></span><span><%= content.distance %></span></div><div class="duration"><span>&#9201;</span><span><%= content.duration %></span></div><div class="speed"><span class="fa fa-tachometer"></span><span><%= content.avg_speed %></span></div>'),

  initialize: function() {
    'use strict';
    this.collection = app.DashboardCollection;
    this.collection.fetch();
    this.render();

    this.listenTo(this.collection, 'add', this.addEntry);
    this.listenTo(this.collection, 'reset', this.render);

  },

  addEntry: function() {
    'use strict';
    this.collection.each(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    'use strict';
    var view = new app.DashboardSessionView({
      model: item
    });
    this.el.append(view);
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
