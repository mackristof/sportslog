/* jshint strict: true, node: true */
var Backbone = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');

var app = app || {};

var PreferencesView = Backbone.NativeView.extend({
  el: '#preferences-view',

  events: {},

  dom: {

    save_btn  : document.getElementById('save-preferences-btn')
  },

  initialize: function() {
  'use strict';
    console.log('PreferencesView initialize');
    // this.listenTo('change', this.render);
  },

  render: function() {
  'use strict';
    console.log('PreferencesView render');
  }
});
module.exports = app.PreferencesView = PreferencesView;
