/* jshint strict: true, node: true */
'use strict';
var Backbone           = require('../../lib/exoskeleton');
var Template           = require('microtemplates');

var Preferences        = require('../../models/preferences');

var utils              = utils || {};
utils.Helpers          = require('../../utils/helpers');

var SessionSummaryView = Backbone.NativeView.extend({
  tagName: 'li',

  events: {
    'click .session-summary-click'  : 'showSessionDetails'
  },

  dom: {},

  template: Template(document.getElementById('session-summary-template-2').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(Preferences, 'change', this.render);
  },

  extend: Backbone.Events,

  render: function() {
    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'value'       : this.model.get('value'),
      'activity'    : this.model.get('activity')
    });
    return this;
  },

  showSessionDetails: function(el) {
    console.log('FACTORY TEMPLATE DASHBOARD SUMMARY - clicked', el, this.model);
    this.model.trigger('dashboard-item-selected', this.model);
  }
});
module.exports = SessionSummaryView;
