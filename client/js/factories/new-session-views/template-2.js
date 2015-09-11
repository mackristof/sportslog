/* jshint strict: true, node: true */
'use strict';

var Preferences = require('../../models/preferences');
var utils       = utils || {};
utils.Helpers   = require('../../utils/helpers');

var Template_2 = function(options) {
  var pref_unit = Preferences.get('unit');
  var distance = utils.Helpers.distanceMeterToChoice(
    pref_unit,
    options.distance,
    false);
  var duration = utils.Helpers.formatDuration(options.duration);
  var speed = utils.Helpers.speedMsToChoice(pref_unit, options.avg_speed);

  this.element        = options.element       || 'new-session-template-2';
  this.rendered_data  = options.rendered_data || {
    'date'          : utils.Helpers.formatDate(options.date),
    'time'          : utils.Helpers.formatTime(options.date),
    'distance'      : distance.value,
    'distance_unit' : distance.unit,
    'durationH'     : duration.hour,
    'durationM'     : duration.min,
    'durationS'     : duration.sec,
    'alt_max'       : options.alt_max,
    'alt_min'       : options.alt_min,
    'alt_unit'      : 'm',
    'avg_speed'     : speed.value,
    'speed_unit'    : speed.unit,
    'calories'      : options.calories
  };
  console.log('factory view', this);
};
module.exports = Template_2;
