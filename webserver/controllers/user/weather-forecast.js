'use strict';
const apiWeather = require('../../api/weather-api')



async function weatherForecast(req, res, next) {
  const { city } = req.body
  const apiRequest = "forecast";
  try {
    const weather = await apiWeather(city, apiRequest)
    console.log(weather);
    res.status(200).send(weather)
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }

}



module.exports = weatherForecast