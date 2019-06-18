'use strict';

const Joi = require('joi');
const uuidV4 = require('uuid');
const bcrypt = require('bcrypt');
const accountModel = require('../../../models/account-model')

async function validate(payload) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
        location: Joi.string().required()
    }
    return Joi.validate(payload, schema)
}


async function createAccount(req, res, next) {
    const data = req.body;

    try {
        await validate(data);
    } catch (e) {
        res.status(400).send(e)
    }
    const now = new Date();
    const uuid = uuidV4();
    const password = await bcrypt.hash(data.password, 10)
    try {
        const result = {
            uuid: uuid,
            createdAt: now,
            email: data.email,
            location: { city: data.location },
            password: password,
        }

        const isUnique = await accountModel.findOne({ email: data.email });
        if (isUnique) res.status(400).send('duplicate entry for this email')

        await accountModel.create(result)


        res.status(201).send()

    } catch (e) {
        console.log(e);
        res.status(401).send(e)
    }

}

module.exports = createAccount