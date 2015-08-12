/* jshint strict: true, node: true */
'use strict';
var Backbone  = require('../exoskeleton');

var factories = factories || {};

var SessionModel = function() {
  function Model() {
    return Backbone.Model.extends({});
  }
}();
module.exports = factories.SessionModel = SessionModel;
