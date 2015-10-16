/* jshint strict: true, node: true */
'use strict';
var Backbone            = require('../../lib/exoskeleton');
var Template            = require('microtemplates');

var Preferences         = require('../../models/preferences');

var utils               = utils || {};
utils.Helpers           = require('../../utils/helpers');
utils.Map               = require('../../utils/map');

module.exports = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  events: {},

  dom: {
    map : document.getElementById('session-map-container')
  },

  template: Template(document.getElementById('body-details-template').innerHTML),

  initialize: function() {
    console.log('SessionView initialized', this);
    this.render();
  },

  render: function() {
    var user_unit = Preferences.get('unit');

    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'value'       : this.model.get('value'),
      'activity'    : this.model.get('activity')
    });
  }
});
