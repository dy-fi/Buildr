const mongoose = require('mongoose')
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user')

module.exports = passport => {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (user, done) {
        User.findById(user._id, function (err, user) {
            done(null, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true,
    },
      function(req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }

          return done(null, user);
        });
      }
    ));
}
