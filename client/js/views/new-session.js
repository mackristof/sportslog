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
    'click #select-activity'            : 'activitySelected',
    'change #import-file'               : 'enableImport',
    'click #import-btn'                 : 'importFile',
    'change #new-session-date'          : '__validateDate',
    'change #new-session-time'          : '__validateDate',
    'change #new-session-distance'      : '__validateDistance',
    'change #new-session-duration-hour' : '__validateDuration',
    'change #new-session-duration-min'  : '__validateDuration',
    'change #new-session-duration-sec'  : '__validateDuration',
    'onsubmit #import-form'             : function() {return false;},
    'click #confirm-add-btn'            : 'addNewSession'
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
    durationH   : document.getElementById('new-session-duration-hour'),
    durationM   : document.getElementById('new-session-duration-min'),
    durationS   : document.getElementById('new-session-duration-sec'),
    alt_max     : document.getElementById('new-session-alt-max'),
    alt_min     : document.getElementById('new-session-alt-min'),
    avg_speed   : document.getElementById('new-session-avg-speed'),
    calories    : document.getElementById('new-session-calories'),
    map         : document.getElementById('new-map-container')
  },

  validated: {
    distance  : false,
    duration  : false,
    date      : true
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
      console.log('session', session);
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
          result.res.calories = calories;
          that.model.set(result.res);
          that.model.trigger('import');
          console.log('new session imported', that.model.attributes);
        }
      });
    };
    reader.readAsText(this.dom.import_file.files[0]);
  },

  addNewSession: function() {
    if (this.validated.date && this.validated.distance && this.validated.duration) {
      /*this.model.set({
        date      : this.dom.date.value,
        time      : this.dom.time.value,
        activity  : this.model.get('activity'),
        distance  : utils.Helpers.distanceChoiceToMeter(
          Preferences.get('unit',
          this.dom.distance.value),
        duration  : this.dom.durationH.value * 3600 + this.dom.durationM.value * 60 + this.dom.durationS.value,
        avg_speed : utils.Helpers.speedChoiceToMs(
          Preferences.get('unit',
          this.dom.avg_speed.value),
        )
        calories  : this.dom.calories.value
      });*/
      console.log('addNewSession', this.model);
      var s = SessionsCollection.add(this.model.attributes);
      s.save();
      SessionsCollection.trigger('add-new', s);
    } else {
       // TODO Manage error messages and invalid values in new-session form
      console.log('something is not right and session could not be added', this.validated);
    }
  },

  renderModel: function() {
    var data = this.model.attributes;
    var pref_unit = Preferences.get('unit');
    console.log('inital data', data);
    this.dom.date.value      = utils.Helpers.formatDate(data.date);
    this.dom.time.value      = utils.Helpers.formatTime(data.date);
    // TODO manage distance and speed calculation from preferences choices
    var distance = utils.Helpers.distanceMeterToChoice(
        Preferences.get('unit'),
        data.distance,
        false);
    this.dom.distance.value  = distance.value/* + ' ' + distance.unit*/;
    this.validated.distance = true;
    // this.dom.duration.value  = utils.Helpers.formatDuration(data.duration);
    var duration = utils.Helpers.formatDuration(data.duration);
    console.log('init duration', duration);
    this.dom.durationH.value = duration.hour;
    this.dom.durationM.value = duration.min;
    this.dom.durationS.value = duration.sec;
    this.validated.duration = true;
/*    this.dom.alt_max.value   = utils.Helpers.distanceMeterToChoice(
        pref_unit,
        data.alt_max,
        false).value;
    this.dom.alt_min.value   = utils.Helpers.distanceMeterToChoice(
        pref_unit,
        data.alt_min,
        false).value;*/
    this.dom.alt_max.value = data.alt_max;
    this.dom.alt_min.value = data.alt_min;
    this.dom.avg_speed.value = utils.Helpers.speedMsToChoice(
        pref_unit,
        data.avg_speed).value;
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

  renderCalories: function() {
    var calories = utils.Helpers.calculateCalories(
        Preferences.get('gender'),
        Preferences.get('weight'),
        Preferences.get('height'),
        new Date().getFullYear() - Preferences.get('birthyear'),
        this.model.get('distance'),
        this.model.get('duration'),
        this.model.get('activity')
    );
    this.dom.calories.value = calories;
    this.model.set('calories', calories);
  },

  renderAvgSpeed: function() {
    var speed = this.model.get('distance') / this.model.get('duration');
    this.dom.avg_speed.value = utils.Helpers.speedMsToChoice(
      Preferences.get('unit'),
      speed
    ).value;
    this.model.set('avg_speed', speed);
  },

  /*render: function() {
    this.dom.date.value = utils.Helpers.formatDate(new Date());
    this.dom.time.value = utils.Helpers.formatTime(new Date());
  },*/

  __validateDuration: function() {
    var h = parseInt(this.dom.durationH.value, 10);
    var m = parseInt(this.dom.durationM.value, 10);
    var s = parseInt(this.dom.durationS.value, 10);
    if (Number.isNaN(h) && Number.isNaN(m) && Number.isNaN(s)) {
      this.validated.duration = false;
    } else if (h >= 0 || h <= 24 && m >= 0 || m <= 60 && s >= 0 || s <= 60) {
      console.log('new duration', h * 3600 + m * 60 + s);
      this.model.set(
        'duration',
        h * 3600 + m * 60 + s
      );
      this.validated.duration = true;
      if (this.validated.distance) {
        this.renderCalories();
        this.renderAvgSpeed();
      }
    } else {
      this.validated.duration = false;
    }
  },

  __validateDate: function() {
    var d = new Date(this.dom.date.value);
    var t = new Date(this.dom.time.value).getTime();
    if (Number.isNaN(d.getTime()) && Number.isNaN(t)) {
      this.validated.date = false;
    } else {
      this.model.set(
        'date',
        d.setTime(t)
      );
      this.validated.date = true;
    }
  },

  __validateDistance: function() {
    var d = parseFloat(this.dom.distance.value);
    if (Number.isNaN(d)) {
      this.validated.distance = false;
    } else {
      this.model.set(
        'distance',
        utils.Helpers.distanceChoiceToMeter(
          Preferences.get('unit'),
          d
        )
      );
      this.validated.distance = true;
      if (this.validated.duration) {
        this.renderCalories();
        this.renderAvgSpeed();
      }
    }
  },

});
module.exports = NewSessionView;
