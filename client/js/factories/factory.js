/* jshint strict: true, node: true */
'use strict';

var activities = {
  running : require('./activities/running')
  };

/*var summary_template_1    = require('./summary-views/template-1');
var summary_template_2    = require('./summary-views/template-2');
var detaillled_template_1 = require('./detailled-views/template-1');
var detaillled_template_2 = require('./detailled-views/template-2');
var Athletics             = require('./session-models/athletics');
var Cycling               = require('./session-models/cycling');
var Mountaineering        = require('./session-models/mountaineering');
var Swimming              = require('./session-models/swimming');
var Sliding               = require('./session-models/sliding');
var WaterSport            = require('./session-models/watersport');
var Body                  = require('./session-models/body');*/


var Factory = (function() {
  var getModel = function(activity) {
    var Model = activities[activity].model;
    console.log('chosen activity', Model);
    console.log('chosen activity', (Model ? new Model() : null));
  };
  var getSummaryView = function() {};
  var getDetailledView = function() {};
  return {
    getModel          : getModel,
    getSummaryView    : getSummaryView,
    getDetailledView  : getDetailledView
  };
})();
module.exports = Factory;

