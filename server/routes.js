/* jshint strict: true, node: true */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


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
 * POST 'file': import a GPS file
 */
router.post('file', function(req, res) {
  'use strict';
  console.log('POST file', req, res);
});

/*
 * GET 'sessions': get all stored sessions
 */

/*
 * POST 'session/_id': save a session
 */

/*
 * GET 'session/_id': get a session data.

/*
 * POST 'preferences': save preferences
 */

/*
 * GET 'reports': get all reports
 */

module.exports = router;

