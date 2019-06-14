'use strict';

const travelModel = require('../../../models/travel-model')
const dateFNS = require('date-fns');


async function travelWeather(req, res, next) {
  const { city, start, end } = req.body;
  const { uuid } = req.claims;
  try {
    const result = {
      uuid: uuid,
      destination: city,
      startingAt: dateFNS.format(start, 'DD - MM - YYYY'),
      endingAt: dateFNS.format(end, 'DD - MM - YYYY'),
      ended: false
    }
    const check = await travelModel.findOne({ uuid, ended: false })
    if (check) return res.status(401).send('You are already traveling!')

    await travelModel.create(result)
    return res.status(201).send("all good lad")
  } catch (e) {
    console.log(e);
    return res.status(400).send(e)
  }
}


module.exports = travelWeather