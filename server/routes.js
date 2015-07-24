/* jshint strict: true, node: true */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var SessionModel = require('./models/session');

router.use(function(req, res, next) {
  'use strict';
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});
router.use(bodyParser.urlencoded({extended: true}));

/*
 * GET '/': render main page
 */
router.get('/', function(req, res) {
  'use strict';
  res.render('index'); /*, function(err, html) {
      res.status(200).send(html);
    });*/
});

/*
 * GET 'sessions': get all stored sessions
 */
router.get('/sessions', function(req, res) {
  'use strict';
  console.log('GET /sessions', res);
});

/*
 * PUT 'sessions/id': save a session
 */
router.put('/sessions/:id', function(req, res, next) {
  'use strict';
  console.log('Got a new session', req.params.id);
  SessionModel.create(req.body, function(err, session) {
    if (err !== null) {
      next(err);
    } else {
      res.send('back');
    }
  });
});

/*
 * GET 'session:_id': get a session data.

/*
 * POST 'preferences': save preferences
 */

/*
 * GET 'reports': get all reports
 */

module.exports = router;

