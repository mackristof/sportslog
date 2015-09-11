/* jshint strict: true, node: true */
'use strict';
var Athletics       = require('./session-models/athletics');
var Cycling         = require('./session-models/cycling');
var Mountaineering  = require('./session-models/mountaineering');
var Swimming        = require('./session-models/swimming');
var Sliding         = require('./session-models/sliding');
var WaterSport      = require('./session-models/watersport');
var Body            = require('./session-models/body');

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

