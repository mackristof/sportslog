/* jshint strict: true, node: true */

var Backbone  = require('../lib/exoskeleton');

var utils     = utils || {};
utils.GPX     = require('../utils/gpx');
// utils.Map     = require('../utils/map');

var app = app || {};

var SessionModel = Backbone.Model.extend({
  defaults: {
    id        : '',
    name      : null,
    duration  : 0,
    distance  : 0,
    date      : null,
    avg_speed : 0,
    calories  : 0,
    alt_max   : 0,
    alt_min   : 0,
    climb_pos : 0,
    climb_neg : 0,
    map       : false,
    data      : []
  },

  initialize: function() {
    'use strict';
    /*
     * If 'id' is not filled, we do it!
     */
    if (this.get('id') === '') {
      this.set({'id': new Date().toISOString()});
    }
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
