/* jshint strict: true, node: true */

var PouchDB = require('pouchdb');

var Sessions = function() {
  'use strict';

  var db = new PouchDB('sessions');

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, function(err, res) {
      if (err !== null) {
        callback(err, null);
      } else {
        console.log('got sessions doc', res);
        var sessions = [];
        if (res.rows.length !== 0) {
          for (var i = 0; i < res.rows.length; i++) {
            sessions[i] = res.rows[i].doc;
          }
        }
        callback(null, sessions);
      }
    });
  };

  var add = function(session, callback) {
    db.post(session, callback);
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
    all:    all,
    add:    add,
    remove: remove
  };
}();
module.exports = Sessions;
