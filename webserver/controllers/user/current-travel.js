'use strict'

const travelModel = require('../../../models/travel-model');
const weatherArrModel = require('../../../models/weather-arr-model')
const apiWeather = require('../../api/weather-api');
const dateFNS = require('date-fns');


async function currentTravel(req, res, next) {
  const { uuid } = req.claims
  try {
    const travel = await travelModel.findOne({ user: uuid })


    if (!travel) {
      return res.status(404).send()
    }
    //TODO: Check if the date is in the past, for some reason it didnt work and had to remove it
    const city = travel.destination;
    const apiRequest = 'forecast';

    const dbWeather = await weatherArrModel.findOne({ user: uuid, current: true })
    console.log(dbWeather);
    if (dbWeather) {
      const hours = dateFNS.differenceInHours(new Date(), dbWeather.createdAt)
      if (hours < 3) {
        return res.status(200).send(dbWeather)
      }
      dbWeather.current = false;
    }
    const result = await apiWeather(city, apiRequest);
    result.user = uuid;
    await weatherArrModel.create(result)
    return res.status(200).send(result)
  } catch (e) {
    console.log(e)
    return res.status(400).send(e)
  }


}

module.exports = currentTravel;