// sweeperPassport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userVerifier = require('../middleware/authVerifier');
const Sweeper = require('../models/Sweeper');

passport.use('sweeper-local', new LocalStrategy(userVerifier.sweeperLocalStrategy));
passport.serializeUser(userVerifier.serializeUser);
passport.deserializeUser(userVerifier.deserializeUser);

module.exports = passport;