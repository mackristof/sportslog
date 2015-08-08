/* jshint strict: true, node: true */

var Backbone  = require('../lib/exoskeleton');

var utils     = utils || {};
utils.GPX     = require('../utils/gpx');

var app = app || {};

var SessionModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function() {
    'use strict';
    // console.log('SessionModel initialize', this);
  },

  importFile: function(file) {
    'use strict';
    var that = this;
    utils.GPX.importFile(file, function(res) {
      if (res.error) {
        // TODO create a modal view for error or information display
        console.log('error while importing', res.res);
      } else {
        that.set(res.res);
        console.log('new session imported', that.attributes);
      }
    });
  }
});
module.exports = app.SessionModel = SessionModel;
