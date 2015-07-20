/* jshint strict: true */
/* global Backbone */

var app = app || {};

(function() {
  'use strict';

  app.MainView = Backbone.NativeView.extend({
    el: 'body',

    events: {
      'click #new-session-btn'  : 'showNewSession',
      'click #dashboard-btn'    : 'showDashboard',
      'click #sessions-btn'     : 'showSessions',
      'click #reports-btn'      : 'showReports',
      'click #preferences-btn'  : 'showPreferences'
    },

    dom: {
      dashboard_view    : document.getElementById('dashboard-view'),
      session_view      : document.getElementById('session-view'),
      new_session_view  : document.getElementById('new-session-view'),
      sessions_view     : document.getElementById('sessions-view'),
      reports_view      : document.getElementById('reports-view'),
      preferences_view  : document.getElementById('preferences-view')
    },

    initialize: function() {
      console.log('MainView initialize');
      this.active_section = this.dom.dashboard_view;
    },

    showNewSession: function() {
      new app.NewSessionView({
        model: new app.SessionModel()
      });
      this._viewSection(this.dom.new_session_view);
    },
    showDashboard: function() {
      this._viewSection(this.dom.dashboard_view);
    },
    showSessions: function() {
      this._viewSection(this.dom.sessions_view);
    },
    showReports: function() {
      this._viewSection(this.dom.reports_view);
    },
    showPreferences: function() {
      this._viewSection(this.dom.preferences_view);
    },
    _viewSection: function(section) {
      console.log('view section', section);
      if (section !== this.active_section) {
        this.active_section.setAttribute('disabled', 'true');
        section.setAttribute('disabled', 'false');
        this.active_section = section;
      }
    },


  });

})();
