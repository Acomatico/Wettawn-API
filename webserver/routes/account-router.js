'use strict';

const express = require('express');
const router = express.Router();

const createAccount = require('../controllers/account/create-account');
const loginAccount = require('../controllers/account/login-account');
const editAccount = require('../controllers/account/edit-account');

router.post('/signup', createAccount);
router.post('/login', loginAccount);
router.put('/edit', editAccount)

module.exports = router;