const express = require('express');
const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

const { adminController, sweeperController } = require('../controllers');

router.get('/Admin-login', adminController.getAdminLogin);
router.get('/logoutAdmin', adminController.logout);
router.get('/', sweeperController.getIndex);
router.get('/logoutSweeper', sweeperController.logout);

// login
router.post('/', sweeperController.login);
router.post('/Admin-login', adminController.login);


module.exports = router;