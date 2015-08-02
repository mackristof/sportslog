/* jshint strict: true, node: true */

var Backbone  = require('../lib/exoskeleton');

var utils     = utils || {};
utils.GPX     = require('../utils/gpx');
// utils.Map     = require('../utils/map');

var app = app || {};

var SessionModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function() {
    'use strict';
  },

  importFile: function(file) {
    'use strict';
    var that = this;
    utils.GPX.importFile(file, function(res) {
      if (res.error) {
        // TODO create a modal view for error or information display
        console.log('error while importing', res.res);
      } else {
        console.log('new session imported', that.attributes);
        that.set(res.res);
      }
    });
  }
});
module.exports = app.SessionModel = SessionModel;
