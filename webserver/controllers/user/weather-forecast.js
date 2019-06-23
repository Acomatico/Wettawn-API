'use strict';

const dateFNS = require('date-fns')
const apiWeather = require('../../api/weather-api')
const weatherArrModel = require('../../../models/weather-arr-model')


async function weatherForecast(req, res, next) {
  const { city } = req.body
  const { uuid } = req.claims;

  const apiRequest = "forecast";
  try {

    const dbWeather = await weatherArrModel.findOne({ user: uuid, current: true })

    if (dbWeather) {
      const hours = dateFNS.differenceInHours(new Date(), dbWeather.createdAt)
      if (hours < 3) {
        return res.status(200).send(dbWeather)
      }
      dbWeather.current = false;
    }

    const weather = await apiWeather(city, apiRequest)
    await weatherArrModel.create(weather)
    return res.status(200).send(weather)
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }

}



module.exports = weatherForecast