/* jshint strict: true, node: true */
'use strict';

var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

// var SessionModel = require('./models/session_cozydb');
// var SessionModel = require('./models/session_mongoose');
var Preferences = require('./models/preferences_pouchdb');
var Sessions    = require('./models/sessions_pouchdb');
var Dashboard   = require('./models/dashboard_pouchdb');

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path, req.body);
  next();
});
router.use(bodyParser.json({limit: '900kb'}));
router.use(bodyParser.urlencoded({extended: true}));

// GET '/': render main page
router.get('/', function(req, res) {
  res.render('index'); /*, function(err, html) {
      res.status(200).send(html);
    });*/
});

// PUT '/': ??
router.put('/', function(req, res) {
  console.log('got put /', req, res);
});

// GET 'sessions': get all stored sessions, truncated (without gps cooordinates)
router.get('/sessions', function(req, res, next) {
  Sessions.all(function(err, data) {
    if (err !== null) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

// GET 'sessions/:id': get one complete session
router.get('/sessions/:id', function(req, res, next) {
  Sessions.one(function(err, data) {
    if (err !== null) {
      next(err);
    } else {
      res.send(data);
    }
  });
});


// POST 'sessions': save a new session
router.post('/sessions', function(req, res, next) {
  console.log('post /sessions', req, res);
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
  Sessions.add(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

// GET '/dashboard : get all stored dashboard entries
router.get('/dashboard', function(req, res, next) {
  Dashboard.all(function(err, data) {
    if (err !== null) {
      next(err);
    } else {
      res.send(data);
    }
  });
});


// POST '/dashboard: add a nex dashboard entry
router.post('/dashboard',function(req, res, next) {
  console.log('post /dashboard', req, res);
  Dashboard.add(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });

});

// PUT '/dashboard: add a nex dashboard entry
router.put('/dashboard',function(req, res, next) {
  // console.log('put /dashboard', req.body);
  Dashboard.add(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

// GET '/preferences': get preferences
router.get('/preferences', function(req, res, next) {
  console.log('get /preferences', res);
  Preferences.all(function(err, data) {
    if (err !== null) {
      next(err);
    } else {
      console.log('sending preferences', data);
      res.send(data);
    }
  });
});

// GET '/preferences:id': get preferences
router.get('/preferences/:id', function(req, res, next) {
  console.log('get /preferences/:id', res);
  Preferences.all(function(err, data) {
    if (err !== null) {
      next(err);
    } else {
      console.log('sending preferences', data);
      res.send(data);
    }
  });
});

// POST '/preferences': save preferences
router.post('/preferences',function(req, res, next) {
  console.log('post /preferences', req);
  Preferences.update(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });

});

// PUT '/preferences': save preferences
router.put('/preferences',function(req, res, next) {
  console.log('put /preferences', req);
  Preferences.update(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

// PUT '/preferences/:id': save preferences
router.put('/preferences/:id',function(req, res, next) {
  console.log('put /preferences/:id', req);
  Preferences.update(req.body, function(err) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

// POST 'preferences': save preferences

// GET 'reports': get all reports

module.exports = router;

