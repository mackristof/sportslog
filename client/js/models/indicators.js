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
  // url: '/indicators',

  initialize: function() {
    'use strict';
    console.log('IndicatorsModel initialize');

    this.listenTo(app.SessionsCollection, 'add', this.sessionAdded);
    this.listenTo(app.SessionsCollection, 'update', this.sessionsUpdated);
    this.listenTo(app.SessionsCollection, 'remove', this.sessionRemoved);
    
    this.listenTo(app.SessionsCollection, 'reset', this.recalculate);
  },
  
  sessionAdded: function(session) {
    'use strict';
    this.attributes.sessions += 1;
    this.attributes.calories += session.calories;
    this.attributes.distance += session.distance;
    this.attributes.duration += session.duration;
  },

  sessionsUpdated: function() {
    'use strict';
    app.SessionsCollection.fetch({reset: true});
  },

  sessionRemoved: function() {
    'use strict';
    app.SessionsCollection.fetch({reset: true});
  },
  
  recalculate: function() {
    'use strict';
    this.atributes = this.defaults;
    app.SessionsCollection.forEach(function(session) {
      this.attributes.sessions += 1;
      this.attributes.calories += session.calories;
      this.attributes.distance += session.distance;
      this.attributes.duration += session.duration;      
    });
  },
});
module.exports = app.IndicatorsModel = new IndicatorsModel({parse: true});
