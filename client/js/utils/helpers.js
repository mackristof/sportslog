/* jshint strict: true, node: true */
'use strict';

var utils = utils || {};

var Helpers = function() {

  /*
   * param choice: String User choice over unit display.
   * param value: Number Distance value in meter.
   * param canNegative: Boolean Tells if value can be negative or not
   *
   * return distance: Array { 'value', 'unit'}
   */
  function formatDistance(choice, value, canNegative) {
    var distance = {};
    if (value === null || value === undefined  || (value < 0 && !canNegative)) {
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

  function inputDistanceToM(choice, value) {
    var distance = 0;
    if (choice === 'metric') {
      distance = value * 1000;
    } else if (choice === 'imperial') {
      distance = (value * 1609.344).toFixed(1);
    }
    return distance;
  }

  function formatSpeed(choice, value) {
    var speed = {};
    if (value === null|| value === undefined   || value < 0 || isNaN(value) || value === Infinity) {
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

  function formatDuration(sec) {
    if (sec === 0) {
      return {
        hour  : 0,
        min   : 0,
        sec   : 0
      };
    }
    var hh = Math.floor(sec / 3600);
    var mm = Math.floor((sec - hh * 3600) / 60);
    var ss = Math.floor(sec - (hh * 3600) - (mm * 60));
    if (hh < 10) {
      hh = '0' + hh;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (ss < 10) {
      ss = '0' + ss;
    }
    return {
      hour  : hh,
      min   : mm,
      sec   : ss
    };
    // return hh + ':' + mm + ':' + ss;
  }

  function calculateCalories(gender, weigth, height, age, distance, duration, activity) {
    console.log('calculate calories');
    // TODO verify the validity of each value
    if (distance === 0 || duration === 0) {
      return 0;
    }
    //var bmr = __originalHarrisBenedictEquation(gender, weigth, height, age, distance, duration);
    //var bmr = __RevisedHarrisBenedictEquation(gender, weigth, height, age, distance, duration);
    var bmr = __MifftlinStJeorEquation(gender, weigth, height, age, distance, duration);
    console.log('RevisedHarrisBenedictEquation', bmr);

    var rate = 0;
    var speed = distance / duration * 3.6; // we calculate speed in km/h to not have to recalculate all intervals :D
    if (activity === 'walking') {
      if (speed <= 4.2) {
        rate = 3;
      } else if (speed <= 5.3) {
        rate = 3.5;
      } else if (speed <= 6) {
        rate = 4.3;
      } else if (speed <= 7) {
        rate = 6;
      } else if (speed <= 8) {
        rate = 8.3;
      } else {
        rate = 9;
      }
    } else if (activity === 'running') {
      if (speed <= 7) {
        rate = 6;
      } else if (speed <= 8) {
        rate = 8.3;
      } else if (speed <= 8.8) {
        rate = 9;
      } else if (speed <= 10) {
        rate = 10;
      } else if (speed <= 10.8) {
        rate = 11;
      } else if (speed <= 11.5) {
        rate = 11.5;
      } else if (speed <= 12.3) {
        rate = 12.5;
      } else if (speed <= 13.2) {
        rate = 13.5;
      } else if (speed <= 14) {
        rate = 14;
      } else if (speed <= 15.8) {
        rate = 15;
      } else if (speed <= 17.2) {
        rate = 16;
      } else if (speed <= 18.4) {
        rate = 17;
      } else if (speed <= 20.2) {
        rate = 18;
      } else if (speed <= 21.5) {
        rate = 19;
      } else if (speed <= 22.5) {
        rate = 19.8;
      } else {
        rate = 20;
      }
    } else if (activity === 'racing') {
      rate = 23;
    } else if (activity === 'swimming') {
      if (speed <= 0.5) {
        rate = 7;
      } else if (speed <= 0.8) {
        rate = 8.6;
      } else if (speed <= 1.1) {
        rate = 10;
      } else {
        rate = 11;
      }
    } else if (activity === 'regular_biking') {
      if (speed <= 10) {
        rate = 5.8;
      } else if (speed <= 19.15) {
        rate = 6.8;
      } else if (speed <= 22.36) {
        rate = 6.8;
      } else if (speed <= 25.58) {
        rate = 10;
      } else if (speed <= 30.57) {
        rate = 12;
      } else {
        rate = 15.8;
      }
    } else if (activity === 'mountain_biking') {
      rate = 8.5;
    } else if (activity === 'time_trial_biking') {
      rate = 16;
    } else if (activity === 'trekking') {
      rate = 7.3;
    } else if (activity === 'skiing') {
      rate = 7;
    } else if (activity === 'paddling') {
      rate = 7;
    } else if (activity === 'climbing') {
      rate = 7;
    }
    var calories = Math.round((bmr * rate / 86400) * duration );
    return calories;
  }

/*  function __originalHarrisBenedictEquation(g, w, h, a) {
    if (g === 'male') {
      return 66.473 + (13.7516 * w) + (5.0033 * h) - (6.7550 * a); // male
    } else {
      return 655.0955 + (9.5634 * w) + (1.8496 * h) - (4.6756 * a); // female
    }
  }

  function __RevisedHarrisBenedictEquation(g, w, h, a) {
    if (g === 'male') {
      return 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a); // male
    } else {
      return 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a); // female
    }
  }*/

  function __MifftlinStJeorEquation(g, w, h, a) {
    var s;
    if (g === 'male') {
      s = 5; // male
    } else {
      s = -161; // female
    }
    return (10 * w) + (6.25 * h) - (5 * a) + s;
  }

  /*
   * Convert a distance from meters into km or miles depending choice
   * param {String}   choice      User choice over unit display.
   * param {Number}   value       Distance value in meter.
   * param {Boolean}  canNegative Tells if returned value can be negative or not
   *
   * return {Array}   d           Contains converted distance (as a Number) and unit (as a String)
   */
  function distanceMeterToChoice(choice, value, canNegative) {
    var d = {};
    if (value === null || value === undefined || (value < 0 && !canNegative)) {
      d.value = '--';
    } else {
      if (choice === 'metric') {
        d.value = (value / 1000).toFixed(1);
        d.unit = 'km';
      } else if (choice === 'imperial') {
        d.value = (value / 1609.344).toFixed(1);
        d.unit = 'miles';
      } else {
        d.value = value.toFixed(1);
        d.unit = 'm';
      }
    }
    return d;
  }

  /*
   * Convert a distance from km or miles to meters
   * param {String}   choice      User choice over unit display.
   * param {Number}   value       Distance value in km or miles.
   *
   * return {Number}  d           Distance value in meters
   */
  function distanceChoiceToMeter(choice, value) {
    var d = 0;
    if (choice === 'metric') {
      d = value * 1000;
    } else if (choice === 'imperial') {
      d = (value * 1609.344).toFixed(1);
    }
    return d;
  }

  /*
   * Convert a velocity from meters per second into km/h or mph depending choice
   * param {String}   choice      User choice over unit display.
   * param {Number}   value       Speed in m/s
   *
   * return {Array}   s           Contains converted speed (as a Number) and unit (as a String)
   */
  function speedMsToChoice(choice, value) {
    var s = {};
    if (value === null || value === undefined || value < 0 || isNaN(value) || value === Infinity) {
      s.value = '--';
    } else {
      if (choice === 'metric') {
        s.value = (value * 3.6).toFixed(1);
        s.unit = 'km/h';
      } else if (choice === 'imperial') {
        s.value = (value * 2.237).toFixed(1);
        s.unit = 'mph';
      } else {
        s.value = value.toFixed(1);
        s.unit = 'm/s';
      }
    }
    return s;
  }

  /*
   * Convert a velocity from km/h or mph to meters per second
   * param {String}   choice      User choice over unit display.
   * param {Number}   value       Speed in km/h or mph
   *
   * return {Float}   s           converted speed in m/s
   */
  function speedChoiceToMs(choice, value) {
    var s = 0;
    if (choice === 'metric') {
      s = (value / 3.6).toFixed(1);
    } else if (choice === 'imperial') {
      s = (value / 2.237).toFixed(1);
    }
    return s;
  }

  return {
    distanceMeterToChoice : distanceMeterToChoice,
    distanceChoiceToMeter : distanceChoiceToMeter,
    speedMsToChoice       : speedMsToChoice,
    speedChoiceToMs       : speedChoiceToMs,
    formatDistance    : formatDistance,
    inputDistanceToM  : inputDistanceToM,
    formatSpeed       : formatSpeed,
    formatDate        : formatDate,
    formatTime        : formatTime,
    formatDuration    : formatDuration,
    calculateCalories : calculateCalories
  };
}();
module.exports = utils.Helpers = Helpers;
