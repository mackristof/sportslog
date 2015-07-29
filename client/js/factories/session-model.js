/* jshint strict: true, node: true */
var Backbone  = require('../exoskeleton');

var factories = factories || {};

var SessionModel = function() {
  'use strict;
  function Model() {
    return Backbone.Model.extends({});
  }
}();
module.exports = factories.SessionModel = SessionModel;