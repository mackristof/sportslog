/* jshint strict: true, node: true */
'use strict';

require('should');
var helpers = require('../client/js/utils/helpers');

describe('HELPERS', function() {
  describe('verify date entry', function() {
    it('should detect correct entry', function() {
      helpers.checkDate('12/10/2015').should.eql(new Date(2015, 9, 12));
    });
    it('should detect wrong entry', function() {
      helpers.checkDate('12.10/2015').should.eql(false);
    });
  });
  describe('verify time entry', function() {
    it('should detect correct entry', function() {
      helpers.checkTime('13:23:22').should.eql(true);
    });
    it('should detect wrong entry', function() {
      helpers.checkTime('25:76:102').should.eql(false);
    });
  });
});
