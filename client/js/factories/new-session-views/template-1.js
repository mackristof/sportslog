/* jshint strict: true, node: true */
'use strict';

var utils       = utils || {};
utils.Helpers   = require('../../utils/helpers');

var Template_1 = function(options) {

  this.element        = options.element       || 'new-session-template-1';
  this.rendered_data  = options.rendered_data || {
    'date'    : utils.Helpers.formatDate(options.date),
    // TODO Manage units in weight rendering
    'weight'  : options.weight
  };
};
module.exports = Template_1;
