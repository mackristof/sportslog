/* jshint strict: true, node: true */

var Backbone            = require('../lib/exoskeleton');
require('../lib/backbone.nativeview');

var app                 = app || {};
app.SessionsCollection  = require('../collections/sessions');

var utils               = utils || {};
utils.Map               = require('../utils/map');

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
    import_form    : document.getElementById('import-form'),
    activity       : document.getElementById('new-activity-details'),
    weight_form    : document.getElementById('weight-form'),

    import_btn     : document.getElementById('import-btn'),
    import_file    : document.getElementById('import-file'),

    date           : document.getElementById('new-session-date'),
    time           : document.getElementById('new-session-time'),
    distance       : document.getElementById('new-session-distance'),
    duration       : document.getElementById('new-session-duration'),
    alt_max        : document.getElementById('new-session-alt-max'),
    alt_min        : document.getElementById('new-session-alt-min'),
    avg_speed      : document.getElementById('new-session-avg-speed'),
    calories       : document.getElementById('new-session-calories'),
  },


  initialize: function() {
    'use strict';
    console.log('NewSessionView initialize');
    
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
    console.log('addNewSession');
    var session = this.newSessionData();
    console.log('session', session);
    app.SessionsCollection.create(session);
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
      distance   : this.dom.distance.value,
      duration  : this.dom.duration.value
    };
  },

  renderModel: function() {
    'use strict';
    var data = this.model.attributes;
    this.dom.date.value      = data.date;
    this.dom.time.value      = data.date;
    // TODO manage distance and speed calculation from preferences choices
    this.dom.distance.value  = this.distanceToKm(data.distance);
    this.dom.duration.value  = this.durationToMin(data.duration);
    this.dom.alt_max.value   = data.alt_max;
    this.dom.alt_min.value   = data.alt_min;
    this.dom.avg_speed.value = this.speedToKmh(data.avg_speed);
    this.dom.calories.value  = 'Not yet';
  },

  renderMap: function() {
    'use strict';
    utils.Map.initialize('new-map');
    utils.Map.getMap(this.model.data);
  },

  // TODO move this in the preferences
  distanceToKm: function(distance) {
    'use strict';
    var d = distance / 1000;
    return d.toFixed(1);
  },

  // TODO move this in the preferences
  durationToMin: function(duration) {
    'use strict';
    var d = duration / 6000;
    return d.toFixed();
  },

  // TODO move this in the preferences
  speedToKmh: function(speed) {
    'use strict';
    return (speed * 3.6).toFixed(1);
  },
});
module.exports = app.NewSessionView = NewSessionView;

