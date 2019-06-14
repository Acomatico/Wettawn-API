'use strict'
const travelModel = require('../../../models/travel-model')
const dateFNS = require('date-fns')

async function getTravelLocation(req, res, next) {
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
    const end = travel.endingAt;
    const start = travel.startingAt;
    return res.status(200).send({ city, start, end })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

module.exports = getTravelLocation