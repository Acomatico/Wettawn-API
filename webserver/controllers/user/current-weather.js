'use strict'

const weatherApi = require('../../api/weather-api')
const accountModel = require('../../../models/account-model');

async function currentWeather(req, res, next) {
  const apiRequest = "weather";
  const { uuid } = req.claims;
  try {
    const accountData = await accountModel.findOne({ uuid })
    const city = accountData.location.city
    const weather = await weatherApi(city, apiRequest);

    res.status(200).send(weather)
  } catch (e) {
    console.log(e);
    res.status(404).send(e)
  }
}

module.exports = currentWeather