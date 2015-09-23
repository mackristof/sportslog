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

  // template: Template(document.getElementById('session-summary-template').innerHTML),
  template: Template('<script type="text/template" id="session-summary-template"><a href="#" class="session-summary-click" session_id="<%= session_cid %>"><div class="summary-container" session_id="<%= session_cid %>"><img src="img/activities/<%= activity %>.svg" alt="<%= activity %>" class="activity" session_id="<%= session_cid %>"><div class="time information" session_id="<%= session_cid %>"><%= date %></div><div class="distance information" session_id="<%= session_cid %>"><span class="fa fa-road" session_id="<%= session_cid %>"></span><span session_id="<%= session_cid %>"><%= distance %></span></div><div class="duration information" session_id="<%= session_cid %>"><span session_id="<%= session_cid %>">&#9201;</span><span session_id="<%= session_cid %>"><%= duration %></span></div><div class="speed information" session_id="<%= session_cid %>"><span class="fa fa-tachometer" session_id="<%= session_cid %>"></span><span session_id="<%= session_cid %>"><%= avg_speed %></span></div></div></a></script>'),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(Preferences, 'change', this.render);
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
    this.model.trigger('selected', this.model);
  }
});
module.exports = SessionSummaryView;
