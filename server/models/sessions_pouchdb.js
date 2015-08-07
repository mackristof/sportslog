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
        callback(null, res.rows);
      }
    });
  };

  var add = function(bookmark, callback) {
    db.post(bookmark, callback);
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
