/* jshint strict: true, node: true */

var Backbone              = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template              = require('microtemplates');

var app                   = app || {};
app.PreferencesView       = require('./preferences');
app.SessionsView          = require('./sessions');
app.DashboardSessionView  = require('./dashboard-session');
app.NewSession            = require('./new-session');
app.PreferencesModel      = require('../models/preferences');
app.SessionModel          = require('../models/session');
app.DashboardModel        = require('../models/dashboard-entry');
app.SessionsCollection    = require('../collections/sessions');
app.DashboardCollection   = require('../collections/dashboard');

var MainView = Backbone.NativeView.extend({
  el: '#app',

  indicatorsTemplate: Template('<div class="indicator align-left"><span class="">Nb Sessions</span><span id="dashboard-sessions-number"><%= nb_sessions %></span></div><div class="indicator align-right"><span class="">Burned calories</span><span id="dashboard-calories"><%= calories %></span></div><div class="indicator align-left"><span class="fa fa-road">Overall distance</span><span id="dashboard-distance"><%= distance %></span></div><div class="indicator align-right"><span class="">Total duration</span><span id="dashboard-duration"><%= duration %></span></div>'),

  events: {
    'click #new-session-btn'  : 'showNewSession',
    'click #dashboard-btn'    : 'showDashboard',
    'click #sessions-btn'     : 'showSessions',
    'click #reports-btn'      : 'showReports',
    'click #preferences-btn'  : 'showPreferences',
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
    this.active_section = this.dom.sessions_view;

    this.listenTo(app.SessionsCollection, 'sync', this.sessionAdded);
    this.listenTo(app.DashboardCollection, 'sync', this.entryAdded);
    this.listenTo(app.DashboardCollection, 'all', this.render);

    app.DashboardCollection.fetch();
  },

  // render: function() {
    // 'use strict';
    // this._viewSection(this.active_section);
    // console.log('collection', this.collection);
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

  entryAdded:function(dashboard) {
    'use strict';
    console.log('app.DashboardCollection', app.DashboardCollection);
    for (var i = 0; i < dashboard.models.length; i++) {
      entry = entry.models[i];
    }
    /*
     * Display the new entry in the Dashboard
     */
    var view;
    if (entry.attributes.type === 'session') {
      view = new app.DashboardSessionView({
        model: entry
      });
    } else if (entry.attributes.type === 'message') {
      console.log('not yet');
    } else {
      // TODO manage when it is neitheir 'session' nor 'message'
      console.log('not yet');
    }

    this.dom.dashboard_view.appendChild(view.render().el);
  },
});
module.exports = app.MainView = MainView;
