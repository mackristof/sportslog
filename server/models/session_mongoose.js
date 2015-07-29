/* jshint strict: true, node: true */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sessions_database');

var Session = new mongoose.Schema({
  id        : String,
  name      : String,
  duration  : Number,
  distance  : Number,
  date      : String,
  avg_speed : Number,
  calories  : Number,
  alt_max   : Number,
  alt_min   : Number,
  climb_pos : Number,
  climb_neg : Number,
  map       : Boolean,
  data      : [{
    date          : String,
    latitude      : Number,
    longitude     : Number,
    altitude      : Number,
    speed         : Number,
    accuracy      : Number,
    vertAccuracy  : Number
   }]
});

var SessionModel = mongoose.model('Session', Session);

module.exports = SessionModel;
