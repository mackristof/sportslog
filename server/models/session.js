/* jshint strict: true, node: true */

var cozydb = require('cozydb');

var Session = cozydb.getModel('sessions', {
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
  data      : []
});

var map = function(doc) {
  'use strict';
  return emit(doc._id, doc);
};

Session.defineRequest('all', map, function(err) {
  'use strict';
  console.log(err);
});

Session.request('all', function(err, sessions) {
  'use strict';
  if (err !== null) {
    console.log('error', err);
  } else {
    console.log('sessions', sessions);
  }
});
