/* jshint strict: true, node: true */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var SessionModel = require('./models/session_cozydb');
// var SessionModel = require('./models/session_mongoose');

router.use(function(req, res, next) {
  'use strict';
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});
router.use(bodyParser.urlencoded({extended: true}));

// GET '/': render main page
router.get('/', function(req, res) {
  'use strict';
  res.render('index'); /*, function(err, html) {
      res.status(200).send(html);
    });*/
});


// GET 'sessions': get all stored sessions
router.get('/sessions', function(req, res) {
  'use strict';
  console.log('get /sessions', res);
/*  return SessionModel.find(function(err, sessions) {
    if (err !== null) {
      return console.log('error on GET /sessions', err);
    } else {
      return res.send(sessions);
    }
  });*/
});

// POST 'sessions': save a new session
router.post('/sessions', function(req, res) {
  'use strict';
  console.log('post /sessions', req.body.id);
  var s = req.body;
  var session = new SessionModel({
    id        : s.id,
    name      : s.name,
    duration  : s.duration,
    distance  : s.distance,
    date      : s.date,
    avg_speed : s.avg_speed,
    calories  : s.calories,
    alt_max   : s.alt_max,
    alt_min   : s.alt_min,
    climb_pos : s.climb_pos,
    climb_neg : s.climb_neg,
    map       : s.map,
    data      : [s.data]
  });
  session.save(function(err) {
    if(err !== null) {
      return console.log('error on POST /sessions', err);
    } else {
      return console.log('new session saved');
    }
    return res.send(session);
  });
});

// PUT '/sessions:id': update a session
router.put('/sessions/:id', function(req, res) {
  'use strict';
  console.log('put /sessions/:id', req.body);
  var s = req.body;
  var session = new SessionModel({
    id        : s.id,
    name      : s.name,
    duration  : s.duration,
    distance  : s.distance,
    date      : s.date,
    avg_speed : s.avg_speed,
    calories  : s.calories,
    alt_max   : s.alt_max,
    alt_min   : s.alt_min,
    climb_pos : s.climb_pos,
    climb_neg : s.climb_neg,
    map       : s.map,
    data      : [s.data]
  });
  session.save(function(err) {
    if(err !== null) {
      return console.log('error on PUT /sessions', err);
    } else {
      return console.log('new session saved');
    }
    return res.send(session);
  });

});



// GET 'session:_id': get a session data.


// POST '/dashboard: add a nex dashboard entry
router.post('/dashbord',function(req, res) {
  'use strict';
  console.log('post /dashboard', req.body.id);
});


// POST 'preferences': save preferences

// GET 'reports': get all reports

module.exports = router;

