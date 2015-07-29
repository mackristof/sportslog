/* jshint strict: true, node: true */

var Session = require('../models/session');

module.exports.list = function(req, res) {
  'use strict';
  Session.all(function(err, sessions) {
    if (err !== null) {
      res.status(500, {error: 'Could not retreive the sessions.'}).send();
    } else {
      res.status(200).send(sessions);
    }
  });
};


module.exports.add = function(res, req) {
  'use strict';
  Session.create(req.body, function(err, session) {
    if (err !== null) {
      res.status(500, {error: 'An error occured - ' + err}).send();
    } else {
      res.status(201).send();
    }
  });
};


module.exports.remove = function() {};
