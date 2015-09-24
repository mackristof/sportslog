/* jshint strict: true, node: true */
'use strict';

var Backbone            = require('../lib/exoskeleton');
// var Template            = require('microtemplates');

// var Preferences         = require('../models/preferences');
// var SessionModel        = require('../models/session');
var SessionsCollection  = require('../collections/sessions');

var Factory             = require('../factories/factory');

// var utils               = utils || {};
// utils.Map               = require('../utils/map');
// utils.GPX               = require('../utils/gpx');
// utils.Helpers           = require('../utils/helpers');

var NewSessionView = Backbone.NativeView.extend({
  el: '#new-session-view',

  events: {
    'click #select-activity'            : 'activitySelected',
    // 'change #import-file'               : 'enableImport',
    'click #confirm-add-btn'            : 'addNewSession'
  },

  dom: {
    // import_form : document.getElementById('import-form'),
    activity    : document.getElementById('new-activity-details'),
    weight_form : document.getElementById('weight-form')
  },

  template : '',

  // unit: Preferences.get('unit'),

  initialize: function() {
    this.listenTo(this.model, 'init', this.renderModel);
  },

  something: function(ev, res) {
    console.log('something on this.model', ev, res);
  },

  activitySelected: function(element) {
    console.log('activity selected', element);
    if (element.target.nodeName === 'INPUT') {
      var activity = element.target.value;
      var session = Factory.getModel(
          activity,
          {'activity' : activity});
      this.model.set(session);
      console.log('session', session);
      // this.model.trigger('init');
      var view = Factory.getNewView(this.model);
      console.log('view to be displayed is', view);
      this.el.appendChild(document.createElement('div').innerHTML = view.render().el);
    }
  },

  enableImport: function() {
    var file_list = this.dom.import_file.files;
    if (file_list.length > 0) {
      this.dom.import_btn.removeAttribute('disabled');
    } else {
      this.dom.import_btn.setAttribute('disabled', 'disabled');
    }
  },

  addNewSession: function() {
    if (this.validated.date && this.validated.distance && this.validated.duration) {
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
    // TODO write a factory for UI components linked to the session family
    var view = Factory.getNewView(this.model);
    console.log('view to be displayed is', view);
    this.el.appendChild(document.createElement('div').innerHTML = view.render().el);
  },

});
module.exports = NewSessionView;
