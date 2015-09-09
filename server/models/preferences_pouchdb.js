/* jshint strict: true, node: true */
'use strict';

var PouchDB = require('pouchdb');

var Preferences = function() {

  var db = new PouchDB('preferences');

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, callback);
  };

  var add = function(doc, callback) {
    db.post(doc, callback);
  };

  var update = function(doc, callback) {
    db.put(doc, callback).then(function() {
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

  // Better update managment found on:
  // https://github.com/pouchdb/pouchdb/issues/1691
  var retryUntilWritten = function(doc) {
    return db.get(doc._id).then(function (origDoc) {
      doc._rev = origDoc._rev;
      return db.put(doc);
    }).catch(function (err) {
      if (err.status === 409) {
        return retryUntilWritten(doc);
      } else { // new doc
        return db.put(doc);
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
    update  : retryUntilWritten,
    remove  : remove
  };
}();
module.exports = Preferences;
