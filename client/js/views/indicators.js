/* jshint strict: true, node: true */
var Backbone        = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template        = require('microtemplates');

var app             = app || {};
app.IndicatorsModel = require('../models/indicators');

var IndicatorsView = Backbone.NativeView.extend({
  el: '#indicators',

  events: {},

  dom: {},

  template: Template(document.getElementById('indicators-template').innerHTML),

  initialize: function() {
    'use strict';
    this.model = app.IndicatorsModel;
    this.model.fetch();
    console.log('IndicatorsView is initalize', this);
    this.render();

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'sync', this.render);

  },

  render: function() {
    'use strict';
    console.log('indicators view is rendered', this);
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  },
});
module.exports = app.IndicatorsView = IndicatorsView;
