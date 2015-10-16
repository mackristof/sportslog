/* jshint strict: true, node: true */
'use strict';

var activities = {
  climbing          : require('./activities/climbing'),
  mountain_biking   : require('./activities/mountain_biking'),
  paddling          : require('./activities/paddling'),
  racing            : require('./activities/racing'),
  regular_biking    : require('./activities/regular_biking'),
  running           : require('./activities/running'),
  skiing            : require('./activities/skiing'),
  time_trial_biking : require('./activities/time_trial_biking'),
  trekking          : require('./activities/trekking'),
  walking           : require('./activities/walking'),
  weight_act        : require('./activities/weight_act'),
  swimming          : require('./activities/swimming')
};

var Factory = (function() {
  var getModel = function(activity, options) {
    console.log('FACTORY - get model for', activity);
    var Model = activities[activity].model;
    return Model ? new Model(options) : null;
  };
  var getNewView = function(model) {
    console.log('FACTORY - display new session view for', model);
    var View = activities[model.get('activity')].new_view;
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

