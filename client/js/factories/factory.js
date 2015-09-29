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
  var getNewView = function(model) {
    // var activity = model.get('activity');
    var View = activities['running'].new_view;
    return new View({
      model: model
    });
  };
  var getDashboardSummaryView = function(model) {
    var View = activities[model.get('activity')].summary_view_dashboard;
    console.log('FACTORY - display dashboard summary view for', View);
    return new View({
      model: model
    });
  };
  var getSessionsSummaryView = function(model) {
  var View = activities[model.get('activity')].summary_view_sessions;
    console.log('FACTORY - display sessions summary view for', View);
    return new View({
      model: model
    });
  };
  var getDetailledView = function(model) {
    var View = activities[model.get('activity')].detailled_view;
    console.log('FACTORY - display detailled view for', View);
    return new View({
      model: model
    });
  };
  return {
    getModel                : getModel,
    getNewView              : getNewView,
    getDashboardSummaryView : getDashboardSummaryView,
    getSessionsSummaryView  : getSessionsSummaryView,
    getDetailledView        : getDetailledView
  };
})();
module.exports = Factory;

