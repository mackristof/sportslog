/* jshint strict: true, node: true */
'use strict';

var Backbone              = require('../lib/exoskeleton');
// var Template              = require('microtemplates');

var IndicatorsView        = require('./indicators');
var DashboardView         = require('./dashboard');
var PreferencesView       = require('./preferences');
var SessionsView          = require('./sessions');
var SessionView           = require('./session');
var NewSession            = require('./new-session');
// var SessionSummary        = require('./session-summary');
var PreferencesModel      = require('../models/preferences');
var SessionModel          = require('../models/session');
var DashboardModel        = require('../models/dashboard-entry');
var SessionsCollection    = require('../collections/sessions');
var DashboardCollection   = require('../collections/dashboard');

var MainView = Backbone.NativeView.extend({
  el: '#app',

  events: {
    'click #new-session-btn'        : 'showNewSession',
    'click #dashboard-btn'          : 'showDashboard',
    'click #sessions-btn'           : 'showSessions',
    'click #reports-btn'            : 'showReports',
    'click #preferences-btn'        : 'showPreferences',

    'click .session-summary-click'  : 'showSession'
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
    // this.listenTo(DashboardCollection, 'all', this.somethingOnDashboard);

    new IndicatorsView();
    new DashboardView();
    new SessionsView();

    // console.log('SessionSummary', SessionSummary);
    // this.listenTo(SessionSummary, 'selected', this.showSession);
  },
  somethingOnPreferences: function(ev, res) {
    console.log('got something on Preferences', ev, res);
  },
  somethingOnSessions: function(ev, res) {
    console.log('got something on Sessions', ev, res);
  },
  somethingOnDashboard: function(ev, res) {
    console.log('got something on Dashboard', ev, res);
  },

  showNewSession: function() {
    // var model = app.SessionsCollection.create({});
    new NewSession({
      model: new SessionModel()
    });
    this._viewSection(this.dom.new_session_view);
  },

  showDashboard: function() {
    this._viewSection(this.dom.dashboard_view);
  },

  showSessions: function() {
    this._viewSection(this.dom.sessions_view);
  },

  showSession: function(el) {
    var that = this;
    var session = SessionsCollection.get(el.target.getAttribute('session_id'));
    console.log('show session details', session);
    session.fetch({
      success : function(res) {
        console.log('success', res);
        new SessionView({
          model: res
        });
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
    console.log('view section', section);
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

    // Create a new Session Summary and add it to the Dashboard Collection
    session = session.attributes;
    // TODO quelle est la différence entre Collection.create et Collection.add
    DashboardCollection.create( new DashboardModel({
      date    : session.date,
      type    : 'session',
      content : {
        date      : session.date,
        activity  : session.activity,
        time      : session.time,
        distance  : session.distance,
        duration  : session.duration,
        avg_speed : session.avg_speed,
        calories  : session.calories
      }
    }));
  },

/*  entryAdded:function(dashboard) {
    'use strict';
    console.log('app.DashboardCollection', app.DashboardCollection);
    var entry;
    for (var i = 0; i < dashboard.models.length; i++) {
      entry = dashboard.models[i];
    }
    // Display the new entry in the Dashboard
    var view;
    if (entry.attributes.type === 'session') {
      view = new app.DashboardSessionView({
        model: entry
      });
    } else if (entry.attributes.type === 'message') {
      console.log('not yet');
    } else {
      // TODO manage when it is neither 'session' nor 'message'
      console.log('not yet');
    }

    this.dom.dashboard_view.appendChild(view.render().el);
  },*/
});
module.exports = MainView;
