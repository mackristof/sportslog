/* jshint strict: true, node: true */
'use strict';

var Mountaineering = function(options) {
  this.family     = options.family    || 'mountaineering';
  this.activity   = options.activity  || '';
  this.date       = options.date      || new Date();
  this.name       = options.name      || '';
  this.duration   = options.duration  || 0;
  this.distance   = options.distance  || 0;
  this.calories   = options.calories  || 0;
  this.alt_max    = options.alt_max   || 0;
  this.alt_min    = options.alt_min   || 0;
  this.climb_pos  = options.climb_pos || 0;
  this.climb_neg  = options.climb_neg || 0;
  this.map        = options.map       || false;
  this.data       = options.data      || [];
};
module.exports = Mountaineering;

