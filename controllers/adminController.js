const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userVerifier = require('../middleware/authVerifier');
const Admin = require('../models/Admin');
const adminPassport = require('../config/adminPassport');


const adminController = {
    login: adminPassport.authenticate('admin-local', {
      successRedirect: '/Admin-dashboard',
      failureRedirect: '/Admin-login',
      failureMessage: true
    }),

    async getAdminLogin(req, res) {
        res.render('Admin-login');
    },

    async getAdminDashboard(req, res) {
        console.log(req.user);
        res.render('Admin-dashboard', {sweeperName: req.user});
    },

    logout: async (req, res) => {
      req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/Admin-login');
      });
    },

    // Define the ensureAuthenticated function before using it
    ensureAuthenticated: async (req, res, next) => {
        console.log(req.user);
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/'); // Redirect to login if not authenticated
    }
}

module.exports = adminController;