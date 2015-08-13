/* jshint strict: true, node: true */
'use strict';
var Athletics       = require('./athletics');
var Cycling         = require('./cycling');
var Mountaineering  = require('./mountaineering');
var Swimming        = require('./swimming');
var Sliding         = require('./sliding');
var WaterSport      = require('./watersport');
var Body            = require('./body');

var abstractFactory = (function() {
  var types = {
    'walking'           : Mountaineering,
    'running'           : Athletics,
    'racing'            : Athletics,
    'swimming'          : Swimming,
    'regular_biking'    : Cycling,
    'mountain_biking'   : Cycling,
    'time_trial_biking' : Cycling,
    'trekking'          : Mountaineering,
    'skiing'            : Sliding,
    'paddling'          : WaterSport,
    'climbing'          : Mountaineering,
    'weight'            : Body
  };

  return {
    get   : function(type, options) {
      var Activity = types[type];
      return (Activity ? new Activity(options) : null);
    }
  };
})();
module.exports = abstractFactory;

