/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');
var Template            = require('microtemplates');
var d3                  = require('../lib/d3');
var crossfilter         = require('../lib/crossfilter');
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
    /*var map = this.model.get('map');
    if (map !== false) {
      utils.Map.initialize('session-map');
      utils.Map.getMap(this.model.get('data'));
      document.getElementById('session-map-container').className = 'new-line';
    }*/
    /*
     * building the Altitude graph
     */
    var alt_table = dc.dataTable('#session-alt-table'),
        alt_graph = dc.lineChart('#session-alt-graph');

    var ndx = crossfilter.crossfilter(this.model.get('data')[0]),
        timeDim = ndx.dimension(function(d) {return d.date;}),
        altGroup = timeDim.group(function(d) {return d.altitude;});
    console.log('ndx', ndx);

    alt_graph
      .width(640).height(480)
      .dimension(timeDim)
      .group(altGroup)
      .x(d3.scale.linear().domain([0,20]));

    alt_graph.render();

    return this;
  },
});
module.exports = SessionView;
