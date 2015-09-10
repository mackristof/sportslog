/* jshint strict: true, node: true */
'use strict';
var Backbone  = require('../lib/exoskeleton');

var utils     = utils || {};
utils.GPX     = require('../utils/gpx');

var SessionModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function() {
    console.log('SessionModel initialize', this);
  },

/*  importFile: function(file) {
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
  }*/
});
module.exports = SessionModel;
