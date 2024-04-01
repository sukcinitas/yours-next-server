const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectMongo = require('connect-mongo');

require('dotenv').config();

const MongoStore = connectMongo(session);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    key: 'cookie-yn',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session-yn',
      ttl: 60 * 60,
      autoRemove: 'native',
    }),
    cookie: {
      httpOnly: true,
      sameSite: true,
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
    },
    unset: 'destroy',
  }),
);

require('./passport.config');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('client/dist'));

app.use('/api', require('./routes'));

app.all('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
