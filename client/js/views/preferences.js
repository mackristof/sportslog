/* jshint strict: true, node: true */
var Backbone = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');

var app = app || {};

var PreferencesView = Backbone.NativeView.extend({
  el: '#preferences-view',

  events: {
    'change #language'  : 'preferenceChanged',
    'change #unit'      : 'preferenceChanged',
    'change #gender'    : 'preferenceChanged',
    'change #birthyear' : 'preferenceChanged'
  },

  dom: {
    language_select   : document.getElementById('language'),
    unit_select       : document.getElementById('unit'),
    gender_select     : document.getElementById('gender'),
    birthyear_select  : document.getElementById('birthyear'),
    // save_btn          : document.getElementById('save-preferences-btn')
  },

  initialize: function() {
  'use strict';
    console.log('PreferencesView initialize');
    // this.listenTo('change', this.render);
  },

  preferenceChanged: function(el) {
    'use strict';
    var preference  = el.target;
    this.model.set(preference.id, preference[preference.selectedIndex].value);
    this.model.save();
  },

  render: function() {
  'use strict';
    console.log('PreferencesView render');
  }
});
module.exports = app.PreferencesView = PreferencesView;
