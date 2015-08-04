/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.DashboardCollection = require('../collections/dashboard');

var MessageView = Backbone.NativeView.extend({
  tagName: 'li',

  events: {},

  dom: {},

  // template: Template('<img src="img/activities/<%= content.activity %>.svg" alt="running" class="activity"><div class="time"><%= content.date %></div><div class="distance"><span class="fa fa-road"></span><span><%= content.distance %></span></div><div class="duration"><span>&#9201;</span><span><%= content.duration %></span></div><div class="speed"><span class="fa fa-tachometer"></span><span><%= content.avg_speed %></span></div>'),

  initialize: function() {
    'use strict';
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);

  },

  render: function() {
    'use strict';
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
}
});
module.exports = app.MessageView = MessageView;
