// enviroment variables
require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

// environment
const app = express();
const port = process.env.PORT || 3000

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose connect
require('./data/Buildr-db');

// static scripts and styles in public
app.use(express.static('public'));

// MIDDLEWARE
// body parser
app.use(bodyParser.urlencoded({ extended: true }));

// AUTHENTICATION

// passport config
require('./passport')(passport);

var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/Buildr-db',
  collection: 'sessions'
});

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        // maxAge: 360000 // an hour
        //secure: true,   // turn this on in production
    },
}));

// passport dependencies
app.use(passport.initialize());
app.use(passport.session());

// CONTROLLERS
require('./controllers/users')(app);
require('./controllers/index')(app);
require('./controllers/auth')(app, passport);
require('./controllers/projects')(app);
require('./controllers/tags')(app);

// START
app.listen(port, console.log('App listening on port ' + port))

module.exports = app;
