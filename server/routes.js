/* jshint strict: true, node: true */

var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

// var SessionModel = require('./models/session_cozydb');
// var SessionModel = require('./models/session_mongoose');
var Preferences = require('./models/preferences_pouchdb');
var Sessions    = require('./models/session_pouchdb');

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
router.get('/sessions', function(req, res, next) {
  'use strict';
  console.log('get /sessions', res);
  Sessions.all(function(err, data) {
    if (err !== null) {
      next(err);
    } else {
      console.log('rendering', data);
      res.render({sessions: data});
    }
  });

/*  return SessionModel.find(function(err, sessions) {
    if (err !== null) {
      return console.log('error on GET /sessions', err);
    } else {
      return res.send(sessions);
    }
  });*/
});

// POST 'sessions': save a new session
router.post('/sessions', function(req, res, next) {
  'use strict';
  console.log('post /sessions', req.body.id);
  Sessions.add(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

// PUT '/sessions:id': update a session
router.put('/sessions/:id', function(req, res, next) {
  'use strict';
  console.log('put /sessions/:id', req.body);
  /*var s = req.body;
  var session = {
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
  };*/
  Sessions.add(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
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

