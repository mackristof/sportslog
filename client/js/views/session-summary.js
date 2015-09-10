/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');
var Template            = require('microtemplates');

var Preferences         = require('../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../utils/helpers');

var SessionSummaryView = Backbone.NativeView.extend({
  tagName: 'li',

  events: {
    'click .session-summary-click'  : 'showSessionDetails'
  },

  dom: {},

  template: Template(document.getElementById('session-summary-template').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(Preferences, 'change', this.render);
    // console.log('SessionSummaryView initialized', this);
  },

  extend: Backbone.Events,

  render: function() {
    var dist = utils.Helpers.distanceMeterToChoice(
        Preferences.get('unit'),
        this.model.get('distance'), false);
    var speed = utils.Helpers.speedMsToChoice(
        Preferences.get('unit'),
        this.model.get('avg_speed'));
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'collection'  : this.model.get('collection'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'distance'    : dist.value + ' ' + dist.unit,
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'avg_speed'   : speed.value + ' ' + speed.unit,
      'activity'    : this.model.get('activity')
    });
    return this;
  },

  showSessionDetails: function() {
    // console.log('clicked', el, this.model);
    this.model.trigger('selected', this.model);
  }
});
// Backbone.utils.extend(SessionSummaryView, Backbone.events);
module.exports = SessionSummaryView;
