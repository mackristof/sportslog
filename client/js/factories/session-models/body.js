/* jshint strict: true, node: true */
'use strict';

var Body = function(options) {
  this.family     = options.family    || 'body';
  this.activity   = options.activity  || '';
  this.date       = options.date      || new Date();
  this.data       = options.data      || 0;
};
module.exports = Body;

