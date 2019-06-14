'use strict';
const weatherApi = require('../../api/weather-api')


async function searchCity(req, res, next) {
  const { city } = req.params
  const apiRequest = "weather";
  try {
    const result = await weatherApi(city, apiRequest)
    res.status(200).send(result)
  } catch (e) {
    console.log(e);
    res.status(404).send(e)
  }


}

module.exports = searchCity