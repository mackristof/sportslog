/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../lib/exoskeleton');
var Template            = require('microtemplates');

var SessionsCollection  = require('../collections/sessions');
var Preferences         = require('../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../utils/helpers');

var IndicatorsView = Backbone.NativeView.extend({
  el: '#indicators',

  template: Template(document.getElementById('indicators-template').innerHTML),

  initialize: function() {
/*    this.model = app.IndicatorsModel;
    this.model.fetch();
    console.log('IndicatorsView is initalize', this);*/
    this.collection = SessionsCollection;
    this.render();

    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'sync', this.render);

    this.listenTo(Preferences, 'change', this.render);

  },

  render: function() {
    // console.log('indicators view is rendered', this);
    var totals = {
      'sessions'  : 0,
      'calories'  : 0,
      'distance'  : 0,
      'duration'  : 0
    };
    this.collection.forEach(function(item) {
      totals.sessions += 1;
      totals.calories += item.get('calories');
      totals.distance =+ item.get('distance');
      totals.duration =+ item.get('duration');
    });
    var dist = utils.Helpers.distanceMeterToChoice(
        Preferences.get('unit'),
        totals.distance, false);
    var duration = utils.Helpers.formatDuration(totals.duration);
    this.el.innerHTML = this.template({
      'sessions'  : totals.sessions,
      'calories'  : totals.calories,
      'distance'  : dist.value + ' ' + dist.unit,
      'duration'  : duration.hour + ':' + duration.min + ':' + duration.sec
    });
    return this;
  },
});
module.exports = IndicatorsView;
