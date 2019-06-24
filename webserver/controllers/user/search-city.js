'use strict';
const weatherApi = require('../../api/weather-api')
const dateFNS = require('date-fns');
const weatherModel = require('../../../models/weather-model')

async function searchCity(req, res, next) {
  const { city } = req.params;
  const { uuid } = req.claims;
  const apiRequest = "weather";
  try {

    const dbWeather = await weatherModel.findOne({ user: uuid, current: true })
    if (dbWeather) {
      const hours = dateFNS.differenceInHours(new Date(), dbWeather.createdAt)
      if (hours < 3) {
        return res.status(200).send(dbWeather)
      }
      dbWeather.current = false;
    }

    const result = await weatherApi(city, apiRequest)
    result.user = uuid;
    result.city = city;
    await weatherModel.create(result);

    res.status(200).send(result)
  } catch (e) {
    console.log(e);
    res.status(404).send(e)
  }


}

module.exports = searchCity