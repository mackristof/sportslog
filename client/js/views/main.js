/* jshint strict: true, node: true */

var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');
var Template            = require('microtemplates');

var app                 = app || {};
app.SessionSummaryView  = require('./session-summary');
app.NewSession          = require('./new-session');
app.SessionModel        = require('../models/session');
app.SessionsCollection  =require('../collections/sessions');

var MainView = Backbone.NativeView.extend({
  el: '#app',
  
  indicatorsTemplate: Template('<div class="indicator align-left"><span class="">Nb Sessions</span><span id="dashboard-sessions-number"><%= nb_sessions %></span></div><div class="indicator align-right"><span class="">Burned calories</span><span id="dashboard-calories"><%= calories %></span></div><div class="indicator align-left"><span class="fa fa-road">Overall distance</span><span id="dashboard-distance"><%= distance %></span></div><div class="indicator align-right"><span class="">Total duration</span><span id="dashboard-duration"><%= duration %></span></div>');

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
    
    this.listenTo(app.SessionsCollection, 'add', this.sessionAdded);
    // this.listenTo(app.SessionsCollection, 'all', this.render);
    
    // app.SessionsCollection.fetch();
  },

  // render: function() {
    // 'use strict';
    // this._viewSection(this.active_section);
    // console.log('collection', this.collection);
    // this.collection.fetch();
  // },

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
    /*
     * Create a new Session Summary and add it to the Dashboard Collection
     */
    app.DashboardCollection.create({
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
    });
    /*
     * Display newly created session in the Session Details View
     */
    var view = new app.SessionDetailsView({model: session});
    this.dom.session_view.appendChild(view.render().el);
    this._viewSection(this.dom.session_view);
  },
});
module.exports = app.MainView = MainView;
