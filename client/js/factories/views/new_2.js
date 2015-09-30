/* jshint strict: true, node: true */
'use strict';
var Backbone  = require('../../lib/exoskeleton');
var Template  = require('microtemplates');

// var Preferences = require('../../models/preferences');
var utils       = utils || {};
utils.Helpers   = require('../../utils/helpers');

module.exports = Backbone.NativeView.extend({
  template: Template(document.getElementById('new-session-template-2').innerHTML),

  validated: {
    'date'  : false,
    'value' : false
  },

  events: {
    'onsubmit #body-form'     : function() {return false;},
    'change #new-body-date'   : '__validateDate',
    'change #new-body-value'  : '__validateValue',
  },

  initialize: function() {
    this.listenTo(this.model, 'all', function(a, b) {console.log('something on this.model', a, b);});
  },
  render: function() {
    // var pref_unit = Preferences.get('unit');
    this.el.innerHTML = this.template({
      'date'  : utils.Helpers.formatDate(this.model.get('date')),
      'value' : this.model.get('value'),
    });
    console.log('new view rendered');
    return this;
  },

  __validateDate: function() {
    var raw = document.getElementById('new-body-date').value.split('/');
    console.log('raw', raw);
    var d = new Date(raw[2], raw[1], raw[0]);
    if (Number.isNaN(d.getTime())) {
      this.validated.date = false;
    } else {
      this.model.set('date', d);
      this.validated.date = true;
    }
  },

  __validateValue: function() {
    var v = document.getElementById('new-body-value').value;
    if (Number.isNaN(v)) {
      this.validated.value = false;
    } else {
      this.model.set('value', v);
    }
  }

});
