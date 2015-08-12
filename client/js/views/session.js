/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.SessionsCollection  = require('../collections/sessions');
app.Preferences         = require('../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../utils/helpers');

var SessionView = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  events: {},

  dom: {},

  template: Template(document.getElementById('session-details-template').innerHTML),

  initialize: function() {
    console.log('SessionView initialized', this);
    this.render();
  },

  render: function() {
    var dist = utils.Helpers.formatDistance(
        app.Preferences.get('unit'),
        this.model.get('distance'),
        false);
    var speed = utils.Helpers.formatSpeed(
        app.Preferences.get('unit'),
        this.model.get('avg_speed'));
    var alt_max = utils.Helpers.formatDistance(
        app.Preferences.get('unit'),
        this.model.get('alt_max'),
        false);
    var alt_min = utils.Helpers.formatDistance(
        app.Preferences.get('unit'),
        this.model.get('alt_min'),
        false);

    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'time'        : utils.Helpers.formatTime(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'distance'    : dist.value + ' ' + dist.unit,
      'duration'    : utils.Helpers.formatDuration(this.model.get('duration')),
      'avg_speed'   : speed.value + ' ' + speed.unit,
      'alt_max'     : alt_max.value + ' ' + alt_max.unit,
      'alt_min'     : alt_min.value + ' ' + alt_min.unit,
      'activity'    : this.model.get('activity')
    });

    // this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  },
});
module.exports = app.SessionView = SessionView;
