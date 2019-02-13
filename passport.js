const mongoose = require('mongoose')
const passport = require('passport')
    , LocalStrategy = require('passport-local')

const User = require('./models/user')


module.exports = function(passport) {



    passport.use(new LocalStrategy({
        passReqToCallback: true,
    },
      function(req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        });
      }
    ));
}
