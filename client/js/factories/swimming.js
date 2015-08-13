/* jshint strict: true, node: true */
'use strict';

var Swimming = function(options) {
  this.family     = options.family    || 'swimming';
  this.activity   = options.activity  || '';
  this.date       = options.date      || '';
  this.name       = options.name      || '';
  this.duration   = options.duration  || 0;
  this.distance   = options.distance  || 0;
  this.calories   = options.calories  || 0;
};
module.exports = Swimming;

