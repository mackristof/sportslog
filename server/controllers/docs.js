/* jshint strict: true, node: true */
'use strict';

var db = require('../models/db_pouchdb');

module.exports.getAll = function(req, res) {
  db.all(function(err, data) {
    if (err !== null) {
      res.status(500).send({error: 'Could not retreive the db.'});
    } else {
      var docs = data.rows;
      var partial_sessions = [];
      if (docs.length !== 0) {
        for (var i = 0; i < docs.length; i++) {
          delete docs[i].doc.data;
          partial_sessions.push(docs[i].doc);
        }
      }
      res.send(partial_sessions);
    }
  });
};

module.exports.getOne = function(req, res) {
  db.one(req.params.id, function(err, data) {
    if (err !== null) {
      res.status(500).send({error: 'Could not retreive one session.'});
    } else {
      res.send(data);
    }
  });
};

module.exports.add = function(req, res) {
  db.add(req.body, function(err, ans) {
    if (err !== null) {
      res.status(500).send({error: 'An error occured - ' + err});
    } else {
      res.send();
    }
  });
};


module.exports.remove = function(req, res) {
  db.get(req.body, function(err, doc) {
    if (err !== null) {
      res.status(500).send({error: 'An error occured during a doc removal - ' + err});
    } else {
      db.remove(doc, function(err, ans) {
        if (err !== null) {
          res.status(500).send({error: 'An error occured during a doc removal - ' + err});
        } else {
          res.send();
        }
      });
    }
  });
};
