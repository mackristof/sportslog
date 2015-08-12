/* jshint strict: true, node: true */
'use strict';

var PouchDB = require('pouchdb');

var Dashboard = function() {

  var db = new PouchDB('dashboard');

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, callback);
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
module.exports = Dashboard;
