/* jshint strict: true, node: true */

var Backbone              = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
// var Template              = require('microtemplates');

var app                   = app || {};
app.IndicatorsView        = require('./indicators');
app.DashboardView         = require('./dashboard');
app.PreferencesView       = require('./preferences');
app.SessionsView          = require('./sessions');
app.SessionView           = require('./session');
app.NewSession            = require('./new-session');
app.SessionSummary        = require('./session-summary');
app.PreferencesModel      = require('../models/preferences');
app.SessionModel          = require('../models/session');
app.DashboardModel        = require('../models/dashboard-entry');
app.SessionsCollection    = require('../collections/sessions');
app.DashboardCollection   = require('../collections/dashboard');

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
    'use strict';
    console.log('MainView initialize', this);
    app.PreferencesModel.fetch();

    this.active_section = this.dom.dashboard_view;
    this.showDashboard();

    // this.listenTo(app.PreferencesModel, 'all', this.somethingOnPreferences);
    this.listenTo(app.SessionsCollection, 'all', this.somethingOnSessions);
    this.listenTo(app.DashboardCollection, 'all', this.somethingOnDashboard);

    new app.IndicatorsView();
    new app.DashboardView();
    new app.SessionsView();

    // console.log('app.SessionSummary', app.SessionSummary);
    // this.listenTo(app.SessionSummary, 'selected', this.showSession);
  },
  somethingOnPreferences: function(ev, res) {
    'use strict';
    console.log('got something on Preferences', ev, res);
  },
  somethingOnSessions: function(ev, res) {
    'use strict';
    console.log('got something on Sessions', ev, res);
  },
  somethingOnDashboard: function(ev, res) {
    'use strict';
    console.log('got something on Dashboard', ev, res);
  },

  //
  // // render: function() {
  //   // 'use strict';
  //   // this._viewSection(this.active_section);
  //   // console.log('collection', this.collection);
    // this.collection.fetch();
  // },

  showNewSession: function() {
    'use strict';
    // var model = app.SessionsCollection.create({});
    new app.NewSession({
      model: new app.SessionModel()
    });
    this._viewSection(this.dom.new_session_view);
  },

  showDashboard: function() {
    'use strict';
    this._viewSection(this.dom.dashboard_view);
  },

  showSessions: function() {
    'use strict';
    this._viewSection(this.dom.sessions_view);
  },

  showSession: function(el) {
    'use strict';
    console.log('show session details', el);
    var id = app.SessionsCollection.get(el.target.getAttribute('session_id'));
    var session = app.SessionsCollection.get(id);
    console.log('got session to display', session);
    new app.SessionView({
      model: session
    });
    this._viewSection(this.dom.session_view);
  },

  showReports: function() {
    'use strict';
    this._viewSection(this.dom.reports_view);
  },

  showPreferences: function() {
    'use strict';
    new app.PreferencesView({
      model: app.PreferencesModel
    });
    this._viewSection(this.dom.preference_view);
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

  sessionAdded: function(session) {
    'use strict';
    console.log('sessionAdded', session);
    // console.log('app.SessionsCollection', app.SessionsCollection);
    // Render newly added session to its view
    var view = new app.SessionsView({
      model: session
    });
    this.dom.sessions_view.appendChild(view.render().el);

    // Display Sessionssection
    this.showSessions();

    // Create a new Session Summary and add it to the Dashboard Collection
    session = session.attributes;
    // TODO quelle est la différence entre Collection.create et Collection.add
    app.DashboardCollection.create( new app.DashboardModel({
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
module.exports = app.MainView = MainView;
