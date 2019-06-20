'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const travelSchema = new Schema({
  User_uuid: {
    type: String,
  },
  destination: {
    type: String
  },
  startingAt: {
    type: String
  },
  endingAt: {
    type: String
  },
  ended: {
    type: Boolean,
    default: false
  }
})

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel