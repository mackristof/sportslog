/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.DashboardCollection = require('../collections/dashboard');
app.SessionsCollection  = require('../collections/sessions');
app.SessionView         = require('./session');
app.Preferences         = require('../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../utils/helpers');

var SessionSummaryView = Backbone.NativeView.extend({
  tagName: 'li',

  events: {
    // 'click .session-summary-click'  : 'showSessionDetails'
  },

  dom: {},

  template: Template(document.getElementById('session-summary-template').innerHTML),

  initialize: function() {
    'use strict';
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(app.Preferences, 'change', this.render);
    console.log('SessionSummaryView initialized', this);

  },

  extend: Backbone.Events,

  render: function() {
    'use strict';

    var dist = utils.Helpers.formatDistance(app.Preferences.get('unit'), this.model.get('distance'), false);
    var speed = utils.Helpers.formatSpeed(app.Preferences.get('unit'), this.model.get('avg_speed'));
    this.el.innerHTML = this.template({
      'session_id'  : this.model.get('_id'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'distance'    : dist.value + ' ' + dist.unit,
      'duration'    : utils.Helpers.formatDuration(this.model.get('duration')),
      'avg_speed'   : speed.value + ' ' + speed.unit,
      'activity'    : this.model.get('activity')
    });
    return this;
  },

  showSessionDetails: function(session) {
    'use strict';
    console.log('I want to see details of', session.target.getAttribute('session_id'));
    // this.trigger('selected', session.target.getAttribute('session_id'));
    var session_model = app.SessionsCollection.get(session.target.getAttribute('session_id'));
    console.log('got session to display', session_model);
    new app.SessionView({
      'session_id' : session_model
    });

  }
});
Backbone.utils.extend(SessionSummaryView, Backbone.events);
module.exports = app.SessionSummaryView = SessionSummaryView;
