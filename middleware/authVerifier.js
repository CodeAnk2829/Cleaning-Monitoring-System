const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');
const Sweeper = require('../models/Sweeper');


const userVerifier = {
  // Configure the LocalStrategy
  sweeperLocalStrategy: async (username, password, done) => {
        // Find the user by username in your database
        try {
          // console.log(req.url);
          const user = await Sweeper.findOne({ username });
    
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
    
          if (user.password != password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
    
          return done(null, user);
        } catch (error) {
          return done(error); // Handle any errors that occur during the database query
        }
      },
      
      // Configure the LocalStrategy
      adminLocalStrategy: async (username, password, done) => {
          // Find the user by username in your database
          try {
            const user = await Admin.findOne({username});
      
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
      
            if (user.password != password) {
              return done(null, false, { message: 'Incorrect password.' });
            }
      
            return done(null, user);
          } catch (error) {
            return done(error); // Handle any errors that occur during the database query
          }
      },
      serializeUser: function(user, cb) {
        process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
      });
    },
    
    deserializeUser: function(user, cb) {
      process.nextTick(function() {
        return cb(null, user);
      });
    }
}

module.exports = userVerifier;