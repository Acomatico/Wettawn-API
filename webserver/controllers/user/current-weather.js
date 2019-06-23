'use strict'

const weatherApi = require('../../api/weather-api')
const accountModel = require('../../../models/account-model');
const weatherModel = require('../../../models/weather-model');
const dateFNS = require('date-fns')

async function currentWeather(req, res, next) {
  const apiRequest = "weather";
  const { uuid } = req.claims;
  try {
    const accountData = await accountModel.findOne({ uuid })
    const city = accountData.location.city

    const dbWeather = await weatherModel.findOne({ user: uuid, current: true })

    if (dbWeather) {
      const hours = dateFNS.differenceInHours(new Date(), dbWeather.createdAt)
      if (hours < 3) {
        return res.status(200).send(dbWeather)
      }
      dbWeather.current = false;
    }

    const weather = await weatherApi(city, apiRequest);
    weather.user = uuid;
    await weatherModel.create(weather)
    res.status(200).send(weather)
  } catch (e) {
    console.log(e);
    res.status(404).send(e)
  }
}

module.exports = currentWeather