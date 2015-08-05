/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.DashboardCollection = require('../collections/dashboard');

var SessionView = Backbone.NativeView.extend({
  tagName: 'li',

  events: {},

  dom: {},

  template: Template(document.getElementById('session-summary-template').innerHTML),

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
module.exports = app.SessionView = SessionView;
