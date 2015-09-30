/* jshint strict: true, node: true */
'use strict';
var Backbone  = require('../../lib/exoskeleton');
var Template  = require('microtemplates');

var Preferences = require('../../models/preferences');
var utils       = utils || {};
utils.Helpers   = require('../../utils/helpers');

module.exports = Backbone.NativeView.extend({
  template: Template(document.getElementById('new-session-template-2').innerHTML),


  events: {
    'onsubmit #weight-form'   : function() {return false;},
    'change #new-weight-date' : '__validateDate',
    'change #new-weight'      : '__validateWeight',
  },

  validated: {
    distance  : false,
    duration  : false,
    date      : true
  },

  initialize: function() {
    this.listenTo(this.model, 'all', function(a, b) {console.log('something on this.model', a, b);});
  },
  render: function() {
    this.validated.distance = true;
    this.validated.duration = true;
    var pref_unit = Preferences.get('unit');
    var distance = utils.Helpers.distanceMeterToChoice(
      pref_unit,
      this.model.get('distance'),
      false
    );
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    var speed = utils.Helpers.speedMsToChoice(pref_unit, this.model.get('avg_speed'));
    this.el.innerHTML = this.template({
      'date'          : utils.Helpers.formatDate(this.model.get('date')),
      'time'          : utils.Helpers.formatTime(this.model.get('date')),
      'distance'      : distance.value,
      'distance_unit' : distance.unit,
      'durationH'     : duration.hour,
      'durationM'     : duration.min,
      'durationS'     : duration.sec,
      'alt_max'       : this.model.get('alt_max'),
      'alt_min'       : this.model.get('alt_min'),
      'alt_unit'      : 'm',
      'avg_speed'     : speed.value,
      'speed_unit'    : speed.unit,
      'calories'      : this.model.get('calories')
    });
    console.log('new view rendered');
    return this;
  },

  __validateDate: function() {
    var d = new Date(document.getElementById('new-session-date').value);
    var t = new Date(document.getElementById('new-session-time').getTime());
    if (Number.isNaN(d.getTime()) && Number.isNaN(t)) {
      this.validated.date = false;
    } else {
      this.model.set(
        'date',
        d.setTime(t)
      );
      this.validated.date = true;
    }
  },
  __validateWeight: function() {}

});
