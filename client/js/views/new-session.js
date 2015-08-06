/* jshint strict: true, node: true */

var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');

var app                 = app || {};
app.Preferences         = require('../models/preferences');
app.SessionModel        = require('../models/session');
app.DashboardEntryModel = require('../models/dashboard-entry');
app.SessionsCollection  = require('../collections/sessions');
app.DashboardCollection = require('../collections/dashboard');

var utils               = utils || {};
utils.Map               = require('../utils/map');
utils.Helpers           = require('../utils/helpers');

var NewSessionView = Backbone.NativeView.extend({
  el: '#new-session-view',

  events: {
    'click #select-activity'  : 'activitySelected',
    'change #import-file'     : 'enableImport',
    'click #import-btn'       : 'importFile',
    'onsubmit #import-form'   : function() {'use strict'; return false;},
    'click #confirm-add-btn'  : 'addNewSession'
  },

  dom: {
    import_form : document.getElementById('import-form'),
    activity    : document.getElementById('new-activity-details'),
    weight_form : document.getElementById('weight-form'),

    import_btn  : document.getElementById('import-btn'),
    import_file : document.getElementById('import-file'),

    date        : document.getElementById('new-session-date'),
    time        : document.getElementById('new-session-time'),
    distance    : document.getElementById('new-session-distance'),
    duration    : document.getElementById('new-session-duration'),
    alt_max     : document.getElementById('new-session-alt-max'),
    alt_min     : document.getElementById('new-session-alt-min'),
    avg_speed   : document.getElementById('new-session-avg-speed'),
    calories    : document.getElementById('new-session-calories'),
    map         : document.getElementById('new-map-container')
  },

  unit: app.Preferences.get('unit'),

  initialize: function() {
    'use strict';
    console.log('NewSessionView initialize', this.unit);

    this.listenTo(this.model, 'change', this.renderModel);
    this.listenTo(this.model, 'change:map', this.renderMap);
  },

  activitySelected: function(element) {
    'use strict';
    console.log('activity selected', element);
    if(element.target.nodeName === 'INPUT') {
      var activity = element.target.value;
      if (activity === 'weight') {
        this.dom.import_form.className = 'hidden behind';
        this.dom.activity.className = 'hidden behind';
        this.dom.weight_form.className = '';
      } else {
        this.dom.import_form.className = '';
        this.dom.activity.className = '';
        this.dom.weight_form.className = 'hidden behind';
      }
      this.model.set('activity', activity);
    }
  },

  enableImport: function() {
    'use strict';
    var file_list = this.dom.import_file.files;
    if (file_list.length > 0) {
      this.dom.import_btn.removeAttribute('disabled');
    } else {
      this.dom.import_btn.setAttribute('disabled', 'disabled');
    }
  },

  importFile: function() {
    'use strict';
    this.model.importFile(this.dom.import_file.files);
  },

  addNewSession: function() {
    'use strict';
    /*var activities = document.forms["select-activity"].elements;
    var activity;
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].checked) {
        activity = activities[i].value;
     }
    }
    this.model.set('date', this.dom.date.value);
    this.model.set('time', this.dom.time.value);
    this.model.set('activity', activity);
    this.model.set('distance', this.dom.distance.value);
    this.model.set('duration', this.dom.duration.value);*/

    // var session = this.newSessionData();
    console.log('addNewSession', this.model.attributes);
    app.SessionsCollection.create(this.model.attributes);
    app.DashboardCollection.create({
      date      : this.model.get('date'),
      time      : this.model.get('time'),
      activity  : this.model.get('activity'),
      distance  : this.model.get('distance'),
      duration  : this.model.get('duration'),
      type      : 'session'
    });
  },

  newSessionData: function() {
    'use strict';
    var activities = document.forms["select-activity"].elements;
    var activity;
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].checked) {
        activity = activities[i].value;
     }
    }
    return {
      date      : this.dom.date.value,
      time      : this.dom.time.value,
      activity  : activity,
      distance  : this.dom.distance.value,
      duration  : this.dom.duration.value
    };
  },

  renderModel: function() {
    'use strict';
    var data = this.model.attributes;
    this.dom.date.value      = utils.Helpers.formatDate(data.date);
    this.dom.time.value      = utils.Helpers.formatTime(data.date);
    // TODO manage distance and speed calculation from preferences choices
    var distance = utils.Helpers.formatDistance(app.Preferences.get('unit'), data.distance, false);
    this.dom.distance.value  = distance.value + ' ' + distance.unit;
    this.dom.duration.value  = utils.Helpers.formatDuration(data.duration).value;
    this.dom.alt_max.value   = utils.Helpers.formatDistance(this.unit, data.alt_max, false).value;
    this.dom.alt_min.value   = utils.Helpers.formatDistance(this.unit, data.alt_min, false).value;
    this.dom.avg_speed.value = utils.Helpers.formatSpeed(this.unit, data.avg_speed).value;
    this.dom.calories.value  = utils.Helpers.calculateCalories(data.activity, data.distance, data.duration);
  },

  renderMap: function() {
    'use strict';
    console.log('rendering map', this.model.attributes.data);
    utils.Map.initialize('new-map');
    utils.Map.getMap(this.model.attributes.data);
    this.dom.map.className = 'new-line';
  },

});
module.exports = app.NewSessionView = NewSessionView;
