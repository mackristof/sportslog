/* jshint strict: true, node: true */
'use strict';

var PouchDB = require('pouchdb');

var Preferences = function() {

  var db = new PouchDB('preferences');

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, function(err, res) {
      if (err !== null) {
        callback(err, null);
      } else {
        var preferences = {};
        if (res.rows.length !== 0) {
          preferences = res.rows[0].doc;
        } else {
          preferences = {
            language  : 'en',
            unit      : 'metric',
            gender    : 'male',
            birthyear : '1970'
          };
        }
        console.log('sending preferences', preferences);
        callback(null, preferences);
      }
    });
  };

  var add = function(bookmark, callback) {
    db.post(bookmark, callback);
  };

  var update = function(preferences, callback) {
    db.put(preferences, callback).then(function() {
      // success
    }).catch(function(err) {
      // error
      if (err.status === 409) {
        // conflict !
        console.log('got pouchdb conflict', err);
      } else {
        // do something else
        console.log('got pouchdb error', err);
      }
    });
  };

  var remove = function(id, callback) {
    db.get(id, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        db.remove(doc, callback);
      }
    });
  };

  return {
    all     : all,
    add     : add,
    update  : update,
    remove  : remove
  };
}();
module.exports = Preferences;
