'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const travelSchema = new Schema({
  uuid: {
    type: String,
    unique: true
  },
  destination: {
    type: String
  },
  startingAt: {
    type: Date
  },
  endingAt: {
    type: Date
  },
  ended: {
    type: Boolean,
    default: false
  }
})

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel