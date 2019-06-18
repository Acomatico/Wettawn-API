'use strict';

function select(temp, weather) {
  if (temp < 5 && temp > -10) {
    if (weather == 'heavy rain') return 'oilskin'
    if (weather.includes('rain')) return 'rain-jacket';
    if (weather.includes('snow')) return 'snow-jacket';
    return 'jacket'
  }
  if (temp <= -10) {
    return 'parka'
  }
  if (temp < 20) {
    if (weather.includes('rain')) return 'jacket';
    return 'hoodie'
  }
  if (temp < 30) {
    if (weather.includes('rain')) return 'umbrella';
    return 'light-clothes'
  }
  if (temp < 40) {
    return 'light-clothes'
  }
}


module.exports = select