/* jshint strict: true, node: true */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
  keywork: String
});

var Session = new mongoose.Schema({
  id        : String,
  name      : String,
  duration  : String,
  distance  : String,
  date      : String,
  avg_speed : String,
  calories  : String,
  alt_max   : String,
  alt_min   : String,
  climb_pos : String,
  climb_neg : String,
  map       : Boolean,
  data      : [Keywords]
});

var SessionModel = mongoose.model('Session', Session);

module.exports = SessionModel;
