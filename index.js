'use strict';

require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoPool = require('./database/mongo-pool');

const routers = require('./webserver/routes');
const app = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/account', routers.accountRouter);
app.use('/api/user', routers.userRouter);

async function init() {
    try {
        await mongoPool.connect()
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
    const port = process.env.PORT

    app.listen(port, () => {
        console.log(`Server should be running I guess on port ${port}`);
    })
}

init()
