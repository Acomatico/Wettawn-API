'use strict';
const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_ATLAS_STRING;
// const mongoUri = process.env.MONGO_URI;
async function connect() {
    try {
        const connection = await mongoose.connect(mongoUri, { useNewUrlParser: true })
        return connection;
    }
    catch (e) {
        throw e;
    }
}
async function disconnect() {
    mongoose.connection.close()
}
module.exports = { connect, disconnect }