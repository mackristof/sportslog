/* jshint strict: true, node: true */
var Backbone        = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');

var app = app || {};

var SessionSummaryView = Backbone.NativeView.extend({});
module.exports = app.SessionSummaryView = SessionSummaryView;
