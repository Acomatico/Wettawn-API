'use strict';

const dateFNS = require('date-fns')
const clothesSelector = require('./clothes-selector');


//TODO: Filter important things, maybe implement different filters
function degreesToDir(deg) {
  if (deg > 337.5 || deg < 22.5) {
    return "N"
  }
  else if (deg < 22.5 + 45) {
    return "NE"
  }
  else if (deg < 22.5 + 90) {
    return "E"
  }
  else if (deg < 22.5 + 135) {
    return "SE"
  }
  else if (deg < 22.5 + 180) {
    return "S"
  }
  else if (deg < 22.5 + 225) {
    return "SW"
  }
  else if (deg < 22.5 + 270) {
    return "W"
  }
  else {
    return "NW"
  }
}
function kelvinToCelsius(k) {
  return (k - 273).toFixed(2)
}
//UNITS INFO:
//
//  Temperature: Kelvin (K)
//  Pressure; Hectopascal (hPa)
//  Humidity: %
//  Cloudiness: %
//  Wind speed: m/s
//  Wind Direction: in degrees, changed to cardinal points
//  Rain: rain volume in the last 3 hours
//  Snow: snow volume in the last 3 hours

async function refineResult(rawData) {
  if (!rawData.list) {
    const result = {
      city: rawData.name,
      temperature: kelvinToCelsius(rawData.main.temp),
      minTemp: kelvinToCelsius(rawData.main.temp_min),
      maxTemp: kelvinToCelsius(rawData.main.temp_max),
      pressure: rawData.main.pressure,
      humidity: rawData.main.humidity,
      weather: rawData.weather[0].description,
      cloudiness: rawData.clouds.all,
      windSpeed: rawData.wind.speed,
      windDir: degreesToDir(rawData.wind.deg),
      rain: rawData.rain,
      snow: rawData.snow,
      clothes: undefined
    }
    result.clothes = clothesSelector(result.temperature, result.weather)
    return result;
  }
  const data = rawData.list;
  const refinedData = [rawData.city.name];
  let curDay; //This 2 variables are needed to make the data passed to the frontend be easier to work with, basically we make an array of days with an array of different times;
  let i = 0;
  data.forEach((time, j) => {
    const result = {
      temperature: kelvinToCelsius(time.main.temp),
      minTemp: kelvinToCelsius(time.main.temp_min),
      maxTemp: kelvinToCelsius(time.main.temp_max),
      pressure: time.main.pressure,
      humidity: time.main.humidity,
      weather: time.weather[0].description,
      cloudiness: time.clouds.all,
      windSpeed: time.wind.speed,
      windDir: degreesToDir(time.wind.deg),
      rain: time.rain,
      snow: time.snow,
      date: dateFNS.format(time.dt_txt, 'DD - MM - YYYY'),
      weekday: dateFNS.format(time.dt_txt, 'dddd'),
      time: dateFNS.format(time.dt_txt, 'hh:mm'),
      clothes: undefined
    }
    result.clothes = clothesSelector(result.temperature, result.weather)
    if (!curDay || curDay !== result.date) {
      curDay = result.date
      i++
      refinedData.push([])
    }
    refinedData[i].push(result)
  });

  // console.log(refinedData);
  return refinedData;
}


module.exports = refineResult;
