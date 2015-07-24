/* jshint strict: true, node: true */
var cozydb = require('cozydb');

var Preferences = cozydb.getModel('preferences', {
  language: {'type': String, 'default': 'English'},
  unit: {'type': String, 'default': 'Metric'},
  birth: Number,
  age: Number,
  gender: String
});

Preferences.getInstance = function(callback) {
  'use strict';
  return Preferences.request('all', function(err, preferences) {
    // var existing;
    if (err) {
      return callback(err);
    }
    var existing = preferences !== undefined ? preferences[0] : void 0;
    if (existing) {
      return callback(null, existing);
    } else {
      return Preferences.create({}, callback);
    }
  });

};
Preferences.get = function(callback) {
  'use strict';
  return Preferences.getInstance(function(err, instance) {
    return callback(err, instance !== undefined ? instance.toObject() : void 0);
  });
};

Preferences.getDefault = function(callback) {
  'use strict';
  var preferences = {
    language: 'English',
    unit: 'Metric',
    birth: 0,
    age: 0,
    gender: ''
  };
  return callback(null, preferences);
};

Preferences.set = function(changes, callback) {
  'use strict';
  return Preferences.getInstance(function(err, instance) {
    if (err) {
      return callback(err);
    }
    return instance.updateAttributes(changes, callback);
  });
};
module.exports = Preferences;
