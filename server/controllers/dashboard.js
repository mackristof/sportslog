/* jshint strict: true, node: true */
'use strict';

var db = require('../models/dashboard_pouchdb');

module.exports.getAll = function(req, res) {
  db.all(function(err, data) {
    if (err !== null) {
      res.status(500).send({error: 'Could not retreive dashboard entries.'});
    } else {
      var docs = data.rows;
      var dashboard = [];
      if (docs.length !== 0) {
        for (var i = 0; i < docs.length; i++) {
          delete docs[i].doc.data;
          dashboard.push(docs[i].doc);
        }
      }
      res.send(dashboard);
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
      res.status(500).send({error: 'An error occured - ' + err});
    } else {
      db.remove(doc, function(err, ans) {
        if (err !== null) {
          res.status(500).send({error: 'An error occured - ' + err});
        } else {
          res.send();
        }
      });
    }
  });
};
