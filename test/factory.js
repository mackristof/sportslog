/* jshint strict: true, node: true */
'use strict';

require('should');

var factory = require('../client/js/factories/factory');

describe('Factory', function() {
  describe('Session model', function() {
    it('should return a "running" model', function() {
      var session = factory.getModel('running', {'activity' : 'running'});
      console.log('session is', session);
      session.activity.should.eql('running');
    });
  });
});
