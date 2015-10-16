/* jshint strict: true, node: true */
'use strict';

var Body = function(options) {
  this.type       = options.type      || 'mesure';
  this.family     = options.family    || 'body';
  this.activity   = options.activity  || '';
  this.date       = options.date      || new Date();
  this.value      = options.value     || 0;
};
module.exports = Body;

