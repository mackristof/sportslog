/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.DashboardCollection = require('../collections/dashboard');
app.Preferences         = require('../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../utils/helpers');

var IndicatorsView = Backbone.NativeView.extend({
  el: '#indicators',

  template: Template(document.getElementById('indicators-template').innerHTML),

  initialize: function() {
    'use strict';
/*    this.model = app.IndicatorsModel;
    this.model.fetch();
    console.log('IndicatorsView is initalize', this);*/
    this.collection = app.DashboardCollection;
    this.render();

    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'sync', this.render);

    this.listenTo(app.Preferences, 'change', this.render);

  },

  render: function() {
    'use strict';
    // console.log('indicators view is rendered', this);
    var totals = {
      'sessions'  : 0,
      'calories'  : 0,
      'distance'  : 0,
      'duration'  : 0
    };
    this.collection.forEach(function(item) {
      if (item.get('type') === 'session') {
        totals.sessions += 1;
        totals.calories += item.get('calories');
        totals.distance =+ item.get('distance');
        totals.duration =+ item.get('duration');
      }
    });
    var dist = utils.Helpers.formatDistance(app.Preferences.get('unit'), totals.distance, false);
    this.el.innerHTML = this.template({
      'sessions'  : totals.sessions,
      'calories'  : totals.calories,
      'distance'  : dist.value + ' ' + dist.unit,
      'duration'  : utils.Helpers.formatDuration(totals.duration)
    });
    return this;
  },
});
module.exports = app.IndicatorsView = IndicatorsView;
