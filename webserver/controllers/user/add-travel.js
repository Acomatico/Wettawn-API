'use strict';

const travelModel = require('../../../models/travel-model')
const dateFNS = require('date-fns');
const uuidV4 = require('uuid');

async function travelWeather(req, res, next) {
  const { destination, start, end } = req.body;

  const { uuid } = req.claims;
  const startArray = start.split('-');
  const endArray = end.split('-')
  try {
    const result = {
      user: uuid,
      destination: destination,
      startingAt: dateFNS.format(new Date(startArray[0], startArray[1] - 1, startArray[2]), "DD-MM-YYYY"),
      endingAt: dateFNS.format(new Date(endArray[0], endArray[1] - 1, endArray[2]), "DD-MM-YYYY"),
      ended: false,
      travelID: uuidV4()
    }
    const check = await travelModel.findOne({ User_uuid: uuid, ended: false })
    if (check) return res.status(401).send('You are already traveling!')
    console.log(result);
    await travelModel.create(result)
    return res.status(201).send()
  } catch (e) {
    console.log(e);
    return res.status(400).send(e)
  }
}


module.exports = travelWeather