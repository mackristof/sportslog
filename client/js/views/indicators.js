/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.DashboardCollection = require('../collections/dashboard');

var IndicatorsView = Backbone.NativeView.extend({
  tagName: 'li',

  events: {},

  dom: {},

  template: Template('<div class="indicator align-left"><span class="">Nb Sessions</span><span id="dashboard-sessions-number"><%= nb_sessions %></span></div><div class="indicator align-right"><span class="">Burned calories</span><span id="dashboard-calories"><%= calories %></span></div><div class="indicator align-left"><span class="fa fa-road">Overall distance</span><span id="dashboard-distance"><%= distance %></span></div><div class="indicator align-right"><span class="">Total duration</span><span id="dashboard-duration"><%= duration %></span></div>'),

  initialize: function() {
    'use strict';
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);

  },

  render: function() {
    'use strict';
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  },
  
  remove: function() {},
});
module.exports = app.IndicatorsView = IndicatorsView;
