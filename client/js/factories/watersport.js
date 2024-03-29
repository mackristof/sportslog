/* jshint strict: true, node: true */
'use strict';

var WaterSport = function(options) {
  this.family     = options.family    || 'watersport';
  this.activity   = options.activity  || '';
  this.date       = options.date      || new Date();
  this.name       = options.name      || '';
  this.duration   = options.duration  || 0;
  this.distance   = options.distance  || 0;
  this.avg_speed  = options.avg_speed || 0;
  this.calories   = options.calories  || 0;
  this.map        = options.map       || false;
  this.data       = options.data      || [];
};
module.exports = WaterSport;

