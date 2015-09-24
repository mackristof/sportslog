/* jshint strict: true, node: true */
'use strict';
var Backbone  = require('../../lib/exoskeleton');
var Template  = require('microtemplates');

var Preferences = require('../../models/preferences');
var utils       = utils || {};
utils.Map       = require('../../utils/map');
utils.GPX       = require('../../utils/gpx');
utils.Helpers   = require('../../utils/helpers');

module.exports = Backbone.NativeView.extend({
  template: Template(document.getElementById('new-session-template-2').innerHTML),


  events: {
    'change #import-file'   : 'enableImport',
    'click #import-btn'     : 'importFile',
    'onsubmit #import-form' : function() {return false;},
  },

  validated: {
    distance  : false,
    duration  : false,
    date      : true
  },

  initialize: function() {
    this.listenTo(this.model, 'import', this.renderImportedData);
    this.listenTo(this.model, 'change:map', this.renderMap);
    // this.listenTo(this.model, 'all', function(a, b) {console.log('something on this.model', a, b);});
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
    reader.readAsText(document.getElementById('import-file').files[0]);
  },

  render: function() {
    this.validated.distance = true;
    this.validated.duration = true;
    var pref_unit = Preferences.get('unit');
    var distance = utils.Helpers.distanceMeterToChoice(
      pref_unit,
      this.model.get('distance'),
      false
    );
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    var speed = utils.Helpers.speedMsToChoice(pref_unit, this.model.get('avg_speed'));
    this.el.innerHTML = this.template({
      'date'          : utils.Helpers.formatDate(this.model.get('date')),
      'time'          : utils.Helpers.formatTime(this.model.get('date')),
      'distance'      : distance.value,
      'distance_unit' : distance.unit,
      'durationH'     : duration.hour,
      'durationM'     : duration.min,
      'durationS'     : duration.sec,
      'alt_max'       : this.model.get('alt_max'),
      'alt_min'       : this.model.get('alt_min'),
      'alt_unit'      : 'm',
      'avg_speed'     : speed.value,
      'speed_unit'    : speed.unit,
      'calories'      : this.model.get('calories')
    });
    console.log('new view rendered');
    return this;
  },

  renderImportedData: function() {
    this.validated.distance = true;
    this.validated.duration = true;
    var pref_unit = Preferences.get('unit');
    var distance = utils.Helpers.distanceMeterToChoice(
      pref_unit,
      this.model.get('distance'),
      false
    );
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    var speed = utils.Helpers.speedMsToChoice(pref_unit, this.model.get('avg_speed'));
    document.getElementById('new-session-date').value = utils.Helpers.formatDate(this.model.get('date'));
      document.getElementById('new-session-time').value = utils.Helpers.formatTime(this.model.get('date'));
      document.getElementById('new-session-distance').value = distance.value;
      document.getElementById('new-session-distance-unit').innerHTML = distance.unit,
      document.getElementById('new-session-duration-hour').value = duration.hour;
      document.getElementById('new-session-duration-min').value = duration.min;
      document.getElementById('new-session-duration-sec').value = duration.sec;
      document.getElementById('new-session-alt-max').value = this.model.get('alt_max');
      document.getElementById('new-session-alt-min').value = this.model.get('alt_min');
      document.getElementById('new-session-alt-unit-max').innerHTML = 'm';
      document.getElementById('new-session-alt-unit-min').innerHTML = 'm';
      document.getElementById('new-session-avg-speed').value = speed.value;
      document.getElementById('new-session-speed-unit').innerHTML = speed.unit,
      document.getElementById('new-session-calories').value =  this.model.get('calories');

/*    this.el.innerHTML = this.template({
      'date'          : utils.Helpers.formatDate(this.model.get('date')),
      'time'          : utils.Helpers.formatTime(this.model.get('date')),
      'distance'      : distance.value,
      'distance_unit' : distance.unit,
      'durationH'     : duration.hour,
      'durationM'     : duration.min,
      'durationS'     : duration.sec,
      'alt_max'       : this.model.get('alt_max'),
      'alt_min'       : this.model.get('alt_min'),
      'alt_unit'      : 'm',
      'avg_speed'     : speed.value,
      'speed_unit'    : speed.unit,
      'calories'      : this.model.get('calories')
    });*/

  },

  enableImport: function() {
    var file_list = document.getElementById('import-file').files;
    if (file_list.length > 0) {
      document.getElementById('import-btn').removeAttribute('disabled');
    } else {
      document.getElementById('import-btn').setAttribute('disabled', 'disabled');
    }
  },

  renderMap: function() {
    var map = this.model.get('map');
    if (map !== false) {
      // console.log('rendering map', this.model.attributes);
      utils.Map.initialize('new-map');
      utils.Map.getMap(this.model.get('data'));
      document.getElementById('new-map-container').className = 'new-line';
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
    document.getElementById('new-session-calories').calories.value = calories;
    this.model.set('calories', calories);
  },

  renderAvgSpeed: function() {
    var speed = this.model.get('distance') / this.model.get('duration');
    document.getElementById('new-session-avg-speed').value = utils.Helpers.speedMsToChoice(
      Preferences.get('unit'),
      speed
    ).value;
    this.model.set('avg_speed', speed);
  },

  __validateDuration: function() {
    var h = parseInt(document.getElementById('new-session-duration-hour').value, 10);
    var m = parseInt(document.getElementById('new-session-duration-min').value, 10);
    var s = parseInt(document.getElementById('new-session-duration-sec').value, 10);
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
    var d = new Date(document.getElementById('new-session-date').value);
    var t = new Date(document.getElementById('new-session-time').getTime());
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
    var d = parseFloat(document.getElementById('new-session-distance').value);
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
