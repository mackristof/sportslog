/* jshint strict: true, node: true */
'use strict';

var Backbone          = require('../lib/exoskeleton');
// var Template              = require('microtemplates');

var Factory           = require('../factories/factory');

var IndicatorsView    = require('./indicators');
var DashboardView     = require('./dashboard');
var PreferencesView   = require('./preferences');
var SessionsView      = require('./sessions');
// var SessionView           = require('./session');
var NewSession        = require('./new-session');
// var SessionSummary        = require('./session-summary');
var PreferencesModel  = require('../models/preferences');
var DocModel          = require('../models/doc');
var DocsCollection    = require('../collections/docs');

var MainView = Backbone.NativeView.extend({
  el: '#app',

  events: {
    'click #new-session-btn'        : 'showNewSession',
    'click #dashboard-btn'          : 'showDashboard',
    'click #sessions-btn'           : 'showSessions',
    'click #reports-btn'            : 'showReports',
    'click #preferences-btn'        : 'showPreferences',

    // 'click .session-summary-click'  : 'showSession'
  },

  dom: {
    dashboard_view    : document.getElementById('dashboard-view'),
    session_view      : document.getElementById('session-view'),
    new_session_view  : document.getElementById('new-session-view'),
    sessions_view     : document.getElementById('sessions-view'),
    reports_view      : document.getElementById('reports-view'),
    preference_view   : document.getElementById('preferences-view')
  },


  initialize: function() {
    console.log('MainView initialize', this);
    PreferencesModel.fetch();

    this.active_section = this.dom.dashboard_view;
    this.showDashboard();

    // this.listenTo(PreferencesModel, 'all', this.somethingOnPreferences);
    // this.listenTo(SessionsCollection, 'all', this.somethingOnSessions);

    new IndicatorsView();
    new DashboardView();
    new SessionsView();

    this.listenTo(DocsCollection, 'model-selected', this.showSession);
    this.listenTo(DocsCollection, 'add-new', this.showSession);
  },
  somethingOnPreferences: function(ev, res) {
    console.log('got something on Preferences', ev, res);
  },
  somethingOnSessions: function(ev, res) {
    console.log('got something on Sessions', ev, res);
  },

  showNewSession: function() {
    // var model = app.SessionsCollection.create({});
    console.log('showNewSession');
    new NewSession({
      model: new DocModel()
    });
    this._viewSection(this.dom.new_session_view);
  },

  showDashboard: function() {
    this._viewSection(this.dom.dashboard_view);
  },

  showSessions: function() {
    this._viewSection(this.dom.sessions_view);
  },

  showSession: function(model) {
    console.log('MAIN - will display model', model);
    var that = this;
    model.fetch({
      success : function(res) {
        console.log('MAIN - success', res);
        /*new SessionView({
          model: res
        });*/
        Factory.getDetailledView(res);
        that._viewSection(that.dom.session_view);
      },
      error   : function(model, response) {
        console.log('error', model, response);
      }
    });
  },

  showReports: function() {
    this._viewSection(this.dom.reports_view);
  },

  showPreferences: function() {
    new PreferencesView({
      model: PreferencesModel
    });
    this._viewSection(this.dom.preference_view);
  },

  _viewSection: function(section) {
    // console.log('view section', section);
    if (section !== this.active_section) {
      this.active_section.setAttribute('disabled', 'true');
      section.setAttribute('disabled', 'false');
      this.active_section = section;
    }
  },

  sessionAdded: function(session) {
    console.log('sessionAdded', session);
    // console.log('app.SessionsCollection', app.SessionsCollection);
    // Render newly added session to its view
    var view = new SessionsView({
      model: session
    });
    this.dom.sessions_view.appendChild(view.render().el);

    // Display Sessionssection
    this.showSessions();
  },

});
module.exports = MainView;
