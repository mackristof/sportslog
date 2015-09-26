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
  var getSummaryView = function(model) {
    var View = activities[model.get('activity')].summary_view;
    return View;
  };
  var getDetailledView = function(model) {
    var View = activities[model.get('activity')].detailled_view;
    console.log('FACTORY - display detailled view for', View);
    return new View({
      model: model
    });
  };
  return {
    getModel          : getModel,
    getNewView        : getNewView,
    getSummaryView    : getSummaryView,
    getDetailledView  : getDetailledView
  };
})();
module.exports = Factory;

