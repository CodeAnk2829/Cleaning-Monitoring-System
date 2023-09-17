// adminPassport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userVerifier = require('../middleware/authVerifier');
const Admin = require('../models/Admin');

passport.use('admin-local', new LocalStrategy(userVerifier.adminLocalStrategy));
passport.serializeUser(userVerifier.serializeUser);
passport.deserializeUser(userVerifier.deserializeUser);

module.exports = passport;
