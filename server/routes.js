/* jshint strict: true, node: true */
'use strict';

var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

var Sessions    = require('./controllers/sessions');
var Dashboard    = require('./controllers/dashboard');
var Preferences    = require('./controllers/preferences');

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
router.get('/sessions', Sessions.getAll);

// GET 'sessions/:id': get one complete session
router.get('/sessions/:id', Sessions.getOne);

// POST 'sessions': save a new session
router.post('/sessions', Sessions.add);

// PUT '/sessions:id': update a session
router.put('/sessions/:id', Sessions.add);

// GET '/dashboard : get all stored dashboard entries
router.get('/dashboard', Dashboard.getAll);

// POST '/dashboard: add a nex dashboard entry
router.post('/dashboard', Dashboard.add);

// PUT '/dashboard: add a nex dashboard entry
router.put('/dashboard', Dashboard.add);

// GET '/preferences': get preferences
router.get('/preferences', Preferences.getAll);

// GET '/preferences:id': get preferences
router.get('/preferences/:id', Preferences.getAll);

// POST '/preferences': save preferences
router.post('/preferences', Preferences.update);

// PUT '/preferences': save preferences
router.put('/preferences', Preferences.update);

// PUT '/preferences/:id': save preferences
router.put('/preferences/:id', Preferences.update);

module.exports = router;

