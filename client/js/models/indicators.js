/* jshint strict: true, node: true */
var Backbone            = require('../lib/exoskeleton');
Backbone.localStorage   = require('../lib/backbone.localStorage');

var app                 = app || {};
app.SessionsCollection  = require('../collections/sessions');

var IndicatorsModel = Backbone.Model.extend({
  defaults: {
    sessions  : 0,
    calories  : 0,
    distance  : 0,
    duration  : 0
  },

  localStorage: new Backbone.localStorage('indicators'),

  initialize: function() {
    'use strict';

    if (app.SessionsCollection.length !== this.get('sessions')) {
      this.relalculate();
    }

    this.listenTo(app.SessionsCollection, 'update', this.sessionsUpdated);
    this.listenTo(app.SessionsCollection, 'reset', this.recalculate);
    this.listenTo(app.SessionsCollection, 'add', this.sessionAdded);

    console.log('IndicatorsModel initialized', this);
  },

  sessionsUpdated: function() {
    'use strict';
    console.log('sessions updated');
    app.SessionsCollection.fetch({reset: true});
  },

  sessionAdded: function(session) {
    'use strict';
    this.set({
      'sessions'  : this.get('sessions') + 1,
      'calories'  : this.get('calories') + session.get('calories'),
      'distance'  : this.get('distance') + session.get('distance'),
      'duration'  : this.get('duration') + session.get('duration')
    });
    console.log('sessionAdded', session);
    this.save();
  },

  recalculate: function() {
    'use strict';
    var i_sessions, i_calories, i_distance, i_duration = 0;
    app.SessionsCollection.forEach(function(session) {
      console.log('session to be treated for indicators', session);
      i_sessions += 1;
      i_calories += session.get('calories');
      i_distance += session.get('distance');
      i_duration += session.get('duration');
    });
    this.set({
      'sessions'  : i_sessions,
      'calories'  : i_calories,
      'distance'  : i_distance,
      'duration'  : i_duration
    });
    this.save();
  },
});
module.exports = app.IndicatorsModel = new IndicatorsModel({parse: true});
