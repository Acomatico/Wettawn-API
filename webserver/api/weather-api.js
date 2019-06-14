'use strict';

const axios = require('axios')
const refinement = require('./result-refinement')

const apiBaseUrl = process.env.API_BASE_URL;
const countryId = process.env.COUNTRY_ID;
const apiKey = process.env.EXTERNAL_API_PASSWORD;


async function getWeather(city, request) {
  const apiFullUrl = `${apiBaseUrl}/${request}?q=${city},${countryId}&APPID=${apiKey}`;
  const apiResponse = await axios.get(apiFullUrl)
  const response = await refinement(apiResponse.data)
  return response
}



module.exports = getWeather;