'use strict'

const travelModel = require('../../../models/travel-model');
const apiWeather = require('../../api/weather-api');
const dateFNS = require('date-fns');

async function currentTravel(req, res, next) {
  const { uuid } = req.claims
  try {
    const travel = await travelModel.findOne({ uuid })


    if (!travel) {
      res.status(404).send()
    }
    if (!dateFNS.isPast(travel.endingAt)) {
      travel.ended = true;
      res.status(404).send()
    }
    const city = travel.destination;
    const apiRequest = 'forecast';

    const result = await apiWeather(city, apiRequest);
    res.status(200).send(result)
  } catch (e) {
    // console.log(e)
    res.status(400).send(e)
  }


}

module.exports = currentTravel;