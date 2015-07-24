/* jshint strict: true, node: true */
var Backbone        = require('../lib/exoskeleton');
require('../Lib/backbone.nativeview');

var app = app || {};

var SessionView = Backbone.NativeView.extend({});
module.exports = app.SessionView = SessionView;
