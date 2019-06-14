'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const accountModel = require('../../../models/account-model');
const jwt = require('jsonwebtoken')

async function validate(payload) {
    const schema = {
        email: Joi.string().email({ minDomainatoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
    }
    return Joi.validate(payload, schema)
}

async function loginAccount(req, res, next) {
    const data = req.body;
    try {
        await validate(data)
    } catch (e) {
        res.status(401).send(e)
    }
    const email = data.email
    try {
        const accountData = await accountModel.findOne({ email })
        const passwordIsOk = await bcrypt.compare(data.password, accountData.password)
        if (!passwordIsOk) res.status(401).send('passwords doesnt match')
        const { uuid, city } = accountData;
        const jwtPayload = { uuid: uuid };
        const jwtExpirationTime = parseInt(process.env.JWT_TOKEN_EXPIRATION, 10)
        const jwtSecret = process.env.JWT_SECRET;
        const token = await jwt.sign(jwtPayload, jwtSecret, { expiresIn: jwtExpirationTime });
        const response = {
            token: token,
            expiresIn: jwtExpirationTime
        }
        res.status(200).send(response)
    } catch (e) {
        console.error(e)
        res.status(401).send(e)
    }


}

module.exports = loginAccount;