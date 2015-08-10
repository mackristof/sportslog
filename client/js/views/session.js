/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.SessionsCollection  = require('../collections/sessions');
app.Preferences         = require('../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../utils/helpers');

var SessionView = Backbone.NativeView.extend({
  el: '#session-view',

  events: {},

  dom: {},

  template: Template(document.getElementById('session-details-template').innerHTML),

  initialize: function() {
    'use strict';
  },

  render: function() {
    'use strict';

    return this;
  },
});
module.exports = app.SessionView = SessionView;
