'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
    uuid: {
        type: String,
        unique: true
    },
    createdAt: Date,
    email: {
        type: String,
        unique: true
    },
    location: {
        city: String,
        country: String,
        coordinates: [Number, Number]
    },
    password: String,


})

const Account = mongoose.model('Account', accountSchema)

module.exports = Account;