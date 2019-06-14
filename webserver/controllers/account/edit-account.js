'use strict';

const accountModel = require('../../../models/account-model')
const Joi = require('joi')

async function validate(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    city: Joi.string().required()
  }
  return Joi.validate(payload, schema)
}

async function editAccount(req, res, next) {
  const { uuid } = req.claims;
  const accountRawData = { ...req.body };
  try {
    await validate(accountData)
  } catch (e) {
    res.status(400).send(e)
  }
  const accountData = {
    email: accountRawData.email,
    location: {
      city: accountRawData.city
    }
  }

  try {
    const account = accountModel.updateOne({ uuid }, accountData);
    res.status(204).send(account)
  } catch (e) {
    res.status(500).send(e)
  }

}


module.exports = editAccount