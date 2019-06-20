'use strict'
const travelModel = require('../../../models/travel-model')
const dateFNS = require('date-fns')

async function getTravelLocation(req, res, next) {
  const { uuid } = req.claims
  try {
    const travel = await travelModel.findOne({ user: uuid })

    if (!travel) {
      res.status(400).send('no city found')
    }
    const city = travel.destination;
    const end = travel.endingAt;
    const start = travel.startingAt;

    const endArray = end.split('-');
    if (dateFNS.isPast(new Date(endArray[2], endArray[1] - 1, endArray[0]))) {
      travel.ended = true;
      res.status(400).send(e)
    }

    return res.status(200).send({ city, start, end })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

module.exports = getTravelLocation