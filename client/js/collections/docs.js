/* jshint strict: true, node: true */
'use strict';

var Backbone      = require('../lib/exoskeleton');

var DocModel      = require('../models/doc');

var DocsCollection = Backbone.Collection.extend({
  model: DocModel,

  url: '/docs',

  initialize: function() {
    console.log('DocsCollection initialize');
  },
});
module.exports = new DocsCollection();
