/* jshint strict: true, node: true */
'use strict';

require('should');

var factory = require('../client/js/factories/factory');

describe('Factory', function() {
  describe('Session model', function() {
    it('should return the correct model', function() {
      var session = factory.getModel('running', {'activity' : 'running'});
      console.log('session is', session);
    });
  });
});
