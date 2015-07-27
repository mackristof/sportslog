/* jshint strict: true, node: true */

var cozydb = require('cozydb');

var SessionModel = cozydb.getModel('sessions', {
  'id'        : String,
  'name'      : String,
  'duration'  : String,
  'distance'  : String,
  'date'      : String,
  'avg_speed' : String,
  'calories'  : String,
  'alt_max'   : String,
  'alt_min'   : String,
  'climb_pos' : String,
  'climb_neg' : String,
  'map'       : Boolean,
  'data'      : String
});

module.exports = SessionModel;

