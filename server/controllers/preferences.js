/* jshint strict: true, node: true */
'use strict';
var db = require('../models/preferences_pouchdb');

module.exports.getAll = function(req, res) {
  db.all(function(err, data) {
    if (err !== null) {
      res.status(500).send({error: 'Could not retreive Preferences.'});
    } else {
      var preferences = {};
      console.log('preferences data', data.rows);
      if (data.rows.length !== 0) {
        preferences = data.rows[0].doc;
      } else {
        preferences = {
          language  : 'en',
          unit      : 'metric',
          gender    : 'male',
          birthyear : 1970,
          height    : 180,
          weight    : 75
        };
        db.add(preferences, function(err, ans) {
          if (err !== null) {
            res.status(500).send({error: 'An error occured - ' + err});
          } else {
            res.send(preferences);
          }
        });
      }
      res.send(preferences);
    }
  });
};

module.exports.update = function(req, res) {
  console.log('Update Preferences', req.body);
  db.update(req.body, function(err, ans) {
    if (err !== null) {
      res.status(500).send({error: 'An error occured - ' + err});
    } else {
      res.send();
    }
  });
};
