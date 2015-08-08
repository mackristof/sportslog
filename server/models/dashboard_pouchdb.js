/* jshint strict: true, node: true */

var PouchDB = require('pouchdb');

var Dashboard = function() {
  'use strict';

  var db = new PouchDB('dashboard');

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, function(err, res) {
      if (err !== null) {
        callback(err, null);
      } else {
        console.log(res);
        var dashboard = [];
        if (res.rows.length !== 0) {
          for (var i = 0; i < res.rows.length; i++) {
            dashboard[i] = res.rows[i].doc;
          }
        }
        callback(null, dashboard);
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
module.exports = Dashboard;
