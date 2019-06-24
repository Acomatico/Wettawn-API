'use strict';
const express = require('express');
const router = express.Router();

const verifyJWT = require('../controllers/session/verify-jwt');
const weatherForecast = require('../controllers/user/weather-forecast');
const currentWeather = require('../controllers/user/current-weather');
const searchCity = require('../controllers/user/search-city');
const addTravel = require('../controllers/user/add-travel');
const currentTravel = require('../controllers/user/current-travel');
const currentLocation = require('../controllers/user/travel-location');
const deleteTravel = require('../controllers/user/delete-travel')


router.post('/forecast', weatherForecast);
router.get('/weather', verifyJWT, currentWeather);
router.get('/search/:city', verifyJWT, searchCity);
router.post('/addtravel', verifyJWT, addTravel)
router.get('/travel', verifyJWT, currentTravel)
router.get('/travel-location', verifyJWT, currentLocation)
router.delete('/delete-travel', verifyJWT, deleteTravel)

module.exports = router;