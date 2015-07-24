/* jshint strict: true, node: true */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var http = require('http');
// var favicon = require('serve-favicon');

var debug = require('debug')('sports_dairy:server');
var routes = require('./server/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'www')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  'use strict';
  var err = new Error('Not Found');
  console.log('Error', req, res);
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    'use strict';
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  'use strict';
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/* This will allow Cozy to run your app smoothly but
it won't break other execution environment */
// var port = normalizePort(process.env.PORT || '9250');
// app.set('port', port);
var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
  'use strict';
  console.log('Server listening to %s:%d within %s environment',
      host, port, app.get('env'));
});
server.on('error', onError);
server.on('listening', onListening);

// server.listen(port, host, function() {
//   'use strict';
//   console.log("Server listening to %s:%d within %s environment",
//       host, port, app.get('env'));
// });

/**
 * Normalize a port into a number, string, or false.
 */
/*function normalizePort(val) {
  'use strict';
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}*/
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  'use strict';
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  'use strict';
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
