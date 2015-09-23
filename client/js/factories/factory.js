/* jshint strict: true, node: true */
'use strict';

var activities = {
  running : require('./activities/running')
};

var Factory = (function() {
  var getModel = function(activity, options) {
    var Model = activities[activity].model;
    return Model ? new Model(options) : null;
  };
  var getNewView = function(activity, options) {
    var View = activities[activity].new_view;
    return View ? new View(options) : null;
  };
  var getSummaryView = function(model) {
    var View = activities[model.activity].summary_view;
    return View;
  };
  var getDetailledView = function(activity, options) {
    var View = activities[activity].detailled_view;
    return View ? new View(options) : null;
  };
  return {
    getModel          : getModel,
    getNewView        : getNewView,
    getSummaryView    : getSummaryView,
    getDetailledView  : getDetailledView
  };
})();
module.exports = Factory;

