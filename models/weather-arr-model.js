'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const weatherArrSchema = new Schema({
  days: [{
    weather: [{
      temperature: {
        type: Number
      },
      minTemp: {
        type: Number
      },
      maxTemp: {
        type: Number
      },
      pressure: {
        type: Number
      },
      humidity: {
        type: Number
      },
      cloudiness: {
        type: Number
      },
      weather: {
        type: String
      },
      windSpeed: {
        type: Number
      },
      windDir: {
        type: String
      },
      rain: {
        type: Number
      },
      snow: {
        type: Number
      },
      date: {
        type: String
      },
      weekDay: {
        type: String
      },
      time: {
        type: String
      },
      clothes: {
        type: String
      }
    }],
    date: String,
    weekday: String
  }],
  user: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  current: {
    type: Boolean,
    default: true
  },
})

const WeatherArr = mongoose.model('WeatherArr', weatherArrSchema)

module.exports = WeatherArr;