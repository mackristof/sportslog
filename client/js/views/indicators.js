/* jshint strict: true, node: true */
var Backbone        = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template        = require('microtemplates');

var app             = app || {};
app.IndicatorsModel = require('../models/indicators');
app.Preferences     = require('../models/preferences');

var utils           = utils || {};
utils.Helpers       = require('../utils/helpers');

var IndicatorsView = Backbone.NativeView.extend({
  el: '#indicators',

  events: {},

  dom: {},

  template: Template(document.getElementById('indicators-template').innerHTML),

  initialize: function() {
    'use strict';
    this.model = app.IndicatorsModel;
    this.model.fetch();
    console.log('IndicatorsView is initalize', this);
    this.render();

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(app.Preferences, 'change', this.render);

  },

  render: function() {
    'use strict';
    // console.log('indicators view is rendered', this);
   var dist = utils.Helpers.formatDistance(app.Preferences.get('unit'), this.model.get('distance'), false);
    var toRender = {
      'sessions'  : this.model.get('sessions'),
      'calories'  : this.model.get('calories'),
      'distance'  : dist.value + ' ' + dist.unit,
      'duration'  : utils.Helpers.formatDuration(this.model.get('duration'))
    };
    this.el.innerHTML = this.template(toRender);
    return this;
  },
});
module.exports = app.IndicatorsView = IndicatorsView;
