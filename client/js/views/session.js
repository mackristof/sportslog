/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');
var Template            = require('microtemplates');
var dc                  = require('../lib/dc');

// var SessionsCollection  = require('../collections/sessions');
var Preferences         = require('../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../utils/helpers');
utils.Map               = require('../utils/map');

var SessionView = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  events: {},

  dom: {
    map : document.getElementById('session-map-container')
  },

  template: Template(document.getElementById('session-details-template').innerHTML),

  initialize: function() {
    console.log('SessionView initialized', this);
    this.render();
  },

  render: function() {
    var dist = utils.Helpers.formatDistance(
        Preferences.get('unit'),
        this.model.get('distance'),
        false);
    var speed = utils.Helpers.formatSpeed(
        Preferences.get('unit'),
        this.model.get('avg_speed'));
    var alt_max = utils.Helpers.formatDistance(
        Preferences.get('unit'),
        this.model.get('alt_max'),
        false);
    var alt_min = utils.Helpers.formatDistance(
        Preferences.get('unit'),
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
    /*
     * building the map
     */
    var map = this.model.get('map');
    if (map !== false) {
      utils.Map.initialize('session-map');
      utils.Map.getMap(this.model.get('data'));
      document.getElementById('session-map-container').className = 'new-line';
    }
    /*
     * building the Altitude graph
     */
    var alt_line = dc.lineChart('#session-alt-grap');

    return this;
  },
});
module.exports = SessionView;
