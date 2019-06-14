'use strict';

const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;

function verifyJWT(req, res, next) {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).send()
  }
  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'JWT') {
    res.status(401).send()
  }
  if (!token) {
    res.status(401).send()
  }
  try {
    const decodedToken = jwt.verify(token, jwtKey)
    // console.log(decodedToken)

    req.claims = {
      uuid: decodedToken.uuid
    }
    return next()
  } catch (e) {
    return res.status(401).send(e)
  }
}

module.exports = verifyJWT;