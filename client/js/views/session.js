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

    var data = this.model.get('data')[0];
    console.log('data', data);
    var sumData = [];
    var i = 0;
    data.forEach(function(d) {
      if (i === 0) {
        sumData[i] = {};
        sumData[i].distance   = d.cumulDistance;
        sumData[i].time       = '';
        sumData[i].latitude   = d.latitude;
        sumData[i].longitude  = d.longitude;
        sumData[i].altitude   = d.altitude;
        sumData[i].climb      = '';
        sumData[i].speed      = '';

      } else if (d.cumulDistance >= sumData[i].distance + 1000) {
        i += 1;
        sumData[i] = {};
        sumData[i].distance   = d.cumulDistance;
        sumData[i].time       = d.date - sumData[i - 1].time;
        sumData[i].latitude   = d.latitude;
        sumData[i].longitude  = d.longitude;
        sumData[i].altitude   = d.altitude;
        sumData[i].climb      = d.altitude - sumData[i - 1].altitude;
        sumData[i].speed      = (d.cumulDistance - sumData[i -1].distance) / sumData[i].time;
      }
    });
    console.log('sumData', sumData);

    var ndx = crossfilter.crossfilter(data),
        distDim = ndx.dimension(function(d) {return d.cumulDistance / 1000;}),
        distMin = 0,
        distMax = this.model.get('distance') / 1000,
        altGroup = distDim.group().reduceSum(function(d) {return d.altitude;});
    console.log('dist', distMin, distMax);
    alt_graph
      .width(960).height(200)
      .dimension(distDim)
      .group(altGroup)
      .x(d3.scale.linear().domain([distMin, distMax]));
    alt_table
      .dimension(distDim)
      .group(function(d) {return d.cumulDistance;})
      .columns([
        function(d) {return d.cumulDistance / 1000;},
        function(d) {return d.altitude;}
      ]);
    // Altitude Graph and Table based on time
    /*data.forEach(function(d) {
      d.date = new Date(d.date);
    });

    var ndx = crossfilter.crossfilter(data),
        timeDim = ndx.dimension(function(d) {return d.date;}),
        dateMin = timeDim.bottom(1)[0].date,
        dateMax = timeDim.top(1)[0].date,
        altGroup = timeDim.group().reduceSum(function(d) {return d.altitude;});

    alt_graph
      .width(960).height(200)
      .dimension(timeDim)
      .group(altGroup)
      .x(d3.time.scale().domain([dateMin, dateMax]));

    alt_table
      .dimension(timeDim)
      .group(function(d) {return d.date;})
      .columns([
        function(d) {return d.date;},
        function(d) {return d.altitude;}
      ]);*/
    dc.renderAll();

    return this;
  },
});
module.exports = SessionView;
