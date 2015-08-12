/* jshint strict: true, node: true */
'use strict';

var Backbone      = require('../lib/exoskeleton');

var SessionModel  = require('../models/session');

var SessionsCollection = Backbone.Collection.extend({
  model: SessionModel,

  url: '/sessions',

  initialize: function() {
    console.log('SessionsCollection initialize');
  },
});
module.exports = new SessionsCollection();
