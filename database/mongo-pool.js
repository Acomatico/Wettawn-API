'use strict';
const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI;
async function connect() {
    const connection = await mongoose.connect(mongoUri, { useNewUrlParser: true })
    return connection;
}
async function disconnect() {
    mongoose.connection.close()
}
module.exports = { connect, disconnect }