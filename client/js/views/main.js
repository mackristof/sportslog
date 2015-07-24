/* jshint strict: true, node: true */

var Backbone = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');

var app = app || {};
app.SessionSummaryView  = require('./session-summary');
app.NewSession          = require('./new-session');
app.SessionModel        = require('../models/session');

app.MainView = Backbone.NativeView.extend({
  el: '#app',

  events: {
    'click #new-session-btn'  : 'showNewSession',
    'click #sessions-btn'     : 'showSessions'
  },

  dom: {
    sessions_view     : document.getElementById('sessions-view'),
    new_session_view  : document.getElementById('new-session-view'),
  },

  initialize: function() {
    'use strict';
    console.log('MainView initialize', this);
    this.active_section = this.dom.sessions_view;
  },

  render: function() {
    'use strict';
    this._viewSection(this.active_section);
    console.log('collection', this.collection);
    this.collection.fetch();
  },

  onSessionAdded: function(session) {
    'use strict';
    var sessionSummaryView = new app.SessionSummaryView({
      model: session
    });
    sessionSummaryView.render();
  },

  showNewSession: function() {
    'use strict';
    new app.NewSession({
      model: new app.SessionModel()
    });
    this._viewSection(this.dom.new_session_view);
  },

  showSessions: function() {
    'use strict';
    this._viewSection(this.dom.sessions_view);
  },

  _viewSection: function(section) {
    'use strict';
    console.log('view section', section);
    if (section !== this.active_section) {
      this.active_section.setAttribute('disabled', 'true');
      section.setAttribute('disabled', 'false');
      this.active_section = section;
    }
  },
});
module.exports = app.MainView;
