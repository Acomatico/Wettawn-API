'use strict'

const mongoose = require('mongoose')

const { Schema } = mongoose;

const WeatherSchema = new Schema({
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
  clothes: {
    type: String
  },
  current: {
    type: Boolean,
    default: true
  },
  user: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Weather = mongoose.model('Weather', WeatherSchema);
module.exports = Weather;