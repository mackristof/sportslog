/* jshint strict: true, node: true */
var Backbone  require('../exoskeleton');
require('../lib/backbone.nativeview');

var app = app || {};

app.PreferencesView = Backbone.NativeView.extend({
  el: '#preferences-view',

  events: {},

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
