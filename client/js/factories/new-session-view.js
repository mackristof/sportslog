/* jshint strict: true, node: true */
'use strict';
var Template_1  = require('./new-session-views/template-1');
var Template_2  = require('./new-session-views/template-2');

var abstractFactory = (function() {
  var types = {
    'walking'           : Template_2,
    'running'           : Template_2,
    'racing'            : Template_2,
    'swimming'          : Template_2,
    'regular_biking'    : Template_2,
    'mountain_biking'   : Template_2,
    'time_trial_biking' : Template_2,
    'trekking'          : Template_2,
    'skiing'            : Template_2,
    'paddling'          : Template_2,
    'climbing'          : Template_2,
    'weight'            : Template_1
  };

  return {
    get   : function(type, options) {
      var Activity = types[type];
      return (Activity ? new Activity(options) : null);
    }
  };
})();
module.exports = abstractFactory;

