/* jshint strict: true, node: true */
'use strict';
var Backbone = require('../lib/exoskeleton');

var PreferencesModel  = require('../models/preferences');

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
    console.log('PreferencesView initialize');
    console.log('PreferencesView this.model', this.model);
    this.model = PreferencesModel;
    // this.model.fetch();
    this.render();
    // this.listenTo('change', this.render);
  },

  preferenceChanged: function(el) {
    var preference  = el.target;
    this.model.set(preference.id, preference[preference.selectedIndex].value);
    this.model.save();
  },

  render: function() {
    this.dom.language_select.value = this.model.get('language');
    this.dom.unit_select.value = this.model.get('unit');
    this.dom.gender_select.value = this.model.get('gender');
    this.dom.birthyear_select.value = this.model.get('birthyear');
    console.log('PreferencesView render');
  }
});
module.exports = PreferencesView;
