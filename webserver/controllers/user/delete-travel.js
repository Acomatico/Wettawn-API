'use strict'

const travelModel = require('../../../models/travel-model')

async function deleteTravel(req, res, next) {
  const { uuid } = req.claims;

  try {
    const travel = await travelModel.findOne({ user: uuid, ended: false });
    if (!travel) return res.status(404).send('Not currently traveling');

    await travelModel.deleteOne({ user: uuid, ended: false });
    return res.status(200).send()
  } catch (e) {
    console.log(e);
    res.status(400).send(e)
  }
}


module.exports = deleteTravel