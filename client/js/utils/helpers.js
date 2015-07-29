/* jshint strict: true, node: true */

var utils = utils || {};

var Helpers = function() {
  'use strict';

  /*
   * param choice: String User choice over unit display.
   * param value: Number Distance value in meter.
   * param canNegative: Boolean Tells if value can be negative or not
   *
   * return distance: Array { 'value', 'unit'}
   */
  function formatDistance(choice, value, canNegative) {
    var distance = {};
    if (value === null  || (value < 0 && !canNegative)) {
      distance.value = '--';
    } else {
      if (choice === 'metric') {
        distance.value = (value / 1000).toFixed(1);
        distance.unit = 'km';
      } else if (choice === 'imperial') {
        distance.value = (value / 1609.344).toFixed(1);
        distance.unit = 'miles';
      } else {
        distance.value = value.toFixed(1);
        distance.unit = 'm';
      }
    }
    return distance;
  }

  function formatSpeed(choice, value) {
    var speed = {};
    if (value === null || value < 0 || isNaN(value) || value === Infinity) {
      speed.value = '--';
    } else {
      if (choice === 'metric') {
        speed.value = (value * 3.6).toFixed(1);
        speed.unit = 'km/h';
      } else if (choice === 'imperial') {
        speed.value = (value * 2.237).toFixed(1);
        speed.unit = 'mph';
      } else {
        speed.value = value.toFixed(1);
        speed.unit = 'm/s';
      }
    }
    return speed;
  }

  function formatDate(value) {
    if(value === null) {
      return '';
    } else {
      var date = new Date(value);

      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = '0' + month.toString();
      }
      if (day < 10) {
        day = '0' + day.toString();
      }
      return day + '/' + month + '/' + year;
    }
  }

  function formatTime(value) {
    if (value === null) {
      return '';
    } else {
      var date = new Date(value);
      var hours = date.getHours();
      if (hours < 10) {
        hours = '0' + hours;
      }
      var minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      return hours + ':' + minutes;
    }
  }

  function formatDuration(value) {
    return (value / 6000).toFixed();
  }

  function calculateCalories(activity, distance, duration) {
    var calories = 'not yet';
    return calories;
  }

  return {
    formatDistance    : formatDistance,
    formatSpeed       : formatSpeed,
    formatDate        : formatDate,
    formatTime        : formatTime,
    formatDuration    : formatDuration,
    calculateCalories : calculateCalories
  };
}();
module.exports = utils.Helpers = Helpers;

