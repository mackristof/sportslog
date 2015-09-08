/* jshint strict: true, node: true */
'use strict';

var Backbone            = require('../lib/exoskeleton');

var Preferences         = require('../models/preferences');
// var SessionModel        = require('../models/session');
var SessionsCollection  = require('../collections/sessions');

var Factory             = require('../factories/session-model');

var utils               = utils || {};
utils.Map               = require('../utils/map');
utils.GPX               = require('../utils/gpx');
utils.Helpers           = require('../utils/helpers');

var NewSessionView = Backbone.NativeView.extend({
  el: '#new-session-view',

  events: {
    'click #select-activity'  : 'activitySelected',
    'change #import-file'     : 'enableImport',
    'click #import-btn'       : 'importFile',
    'onsubmit #import-form'   : function() {return false;},
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

  unit: Preferences.get('unit'),

  initialize: function() {
    // console.log('NewSessionView initialize', this.unit);

    this.listenTo(this.model, 'init', this.renderModel);
    this.listenTo(this.model, 'import', this.renderModel);
    this.listenTo(this.model, 'change:map', this.renderMap);
  },

  activitySelected: function(element) {
    // console.log('activity selected', element);
    if (element.target.nodeName === 'INPUT') {
      var activity = element.target.value;
      var session = Factory.get(
          activity,
          {
            'activity'  : activity
          });
      // TODO write a factory for UI components linked to the session family
      if (session.family === 'body') {
        this.dom.import_form.className = 'hidden behind';
        this.dom.activity.className = 'hidden behind';
        this.dom.weight_form.className = '';
      } else {
        this.dom.import_form.className = '';
        this.dom.activity.className = '';
        this.dom.weight_form.className = 'hidden behind';
      }
      this.model.set(session);
    }
    this.model.trigger('init');
  },

  enableImport: function() {
    var file_list = this.dom.import_file.files;
    if (file_list.length > 0) {
      this.dom.import_btn.removeAttribute('disabled');
    } else {
      this.dom.import_btn.setAttribute('disabled', 'disabled');
    }
  },

  importFile: function() {
    var reader = new FileReader();
    var that = this;
    reader.onloadend = function() {
      var p = new DOMParser();
      utils.GPX.importFile(p.parseFromString(reader.result, 'text/xml'), function(result) {
        if (result.error) {
          // TODO create a modal view for error or information display
          console.log('error while importing', result.res);
        } else {
          var calories = utils.Helpers.calculateCalories(
              Preferences.get('gender'),
              Preferences.get('weight'),
              Preferences.get('height'),
              new Date().getFullYear() - Preferences.get('birthyear'),
              result.res.distance,
              result.res.duration,
              that.model.get('activity')
          );
          console.log('calories', calories);
          result.res.calories = calories;
          console.log('success while importing', result.res);
          that.model.set(result.res);
          that.model.trigger('import');
          // console.log('new session imported', that.model.attributes);
        }
      });
    };
    reader.readAsText(this.dom.import_file.files[0]);
  },

  addNewSession: function() {
    // console.log('addNewSession', this.model);
    var s = SessionsCollection.add(this.model.attributes);
    s.save();
    SessionsCollection.trigger('add-new', s);
  },

  newSessionData: function() {
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
    var data = this.model.attributes;
    console.log('inital data', data);
    this.dom.date.value      = utils.Helpers.formatDate(data.date);
    this.dom.time.value      = utils.Helpers.formatTime(data.date);
    // TODO manage distance and speed calculation from preferences choices
    var distance = utils.Helpers.formatDistance(
        Preferences.get('unit'),
        data.distance,
        false);
    this.dom.distance.value  = distance.value + ' ' + distance.unit;
    this.dom.duration.value  = utils.Helpers.formatDuration(data.duration);
    this.dom.alt_max.value   = utils.Helpers.formatDistance(this.unit, data.alt_max, false).value;
    this.dom.alt_min.value   = utils.Helpers.formatDistance(this.unit, data.alt_min, false).value;
    this.dom.avg_speed.value = utils.Helpers.formatSpeed(this.unit, data.avg_speed).value;
    this.dom.calories.value  = data.calories;
  },

  renderMap: function() {
    var map = this.model.get('map');
    if (map !== false) {
      // console.log('rendering map', this.model.attributes);
      utils.Map.initialize('new-map');
      utils.Map.getMap(this.model.get('data'));
      this.dom.map.className = 'new-line';
    }
  },

  render: function() {
    this.dom.date.value = utils.Helpers.formatDate(new Date());
    this.dom.time.value = utils.Helpers.formatTime(new Date());
  }

});
module.exports = NewSessionView;
