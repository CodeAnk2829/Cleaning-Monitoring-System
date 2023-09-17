const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userVerifier = require('../middleware/authVerifier');
const Sweeper = require('../models/Sweeper');
const sweeperPassport = require('../config/sweeperPassport');

const sweeperController = {
    login: sweeperPassport.authenticate('sweeper-local', {
      successRedirect: '/sweeper-dashboard',
      failureRedirect: '/',
      failureMessage: true
    }),

    async getIndex(req, res) {
        res.render('index');
    },

    async getsweeperDashboard(req, res) {
        res.render('sweeper-dashboard');
    },

    logout: async (req, res) => {
        console.log("hi i am sweeper logout");
      req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    },
    
    // Define the ensureAuthenticated function before using it
    ensureAuthenticated: async (req, res, next) => {
        console.log("hi i am sweeper ensureAuthentication");
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/'); // Redirect to login if not authenticated
    }
}

module.exports = sweeperController;