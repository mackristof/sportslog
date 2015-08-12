/* jshint strict: true, node: true */
'use strict';

var PouchDB = require('pouchdb');

var Sessions = function() {

  var db = new PouchDB('sessions');

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, callback);
  };

  var add = function(doc, callback) {
    db.post(doc, callback);
  };

  var one = function(id, callback) {
    db.get(id, callback);
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
    one     : one,
    add     : add,
    remove  : remove
  };
}();
module.exports = Sessions;
