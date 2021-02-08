const passport = require('passport');
const { compareSync } = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const Group = require('./models/group.model');
const GroupService = require('./services/group.service');

passport.use(
  new LocalStrategy({
    usernameField: 'name',
    passwordField: 'passcode'
  }, async (name, passcode, done) => {
    try {
      if (!name || !passcode) {
        return done({
          message: 'Authentication failed!',
          type: 'general',
        }, false);
      }
      const group = await GroupService.getGroupInfo(name);
      if (!group) {
        return done({
          message: 'Group with this name is not found!',
          type: 'name',
        }, false);
      }
      if (compareSync(passcode, group.passcode)) {
        return done(null, group);
      }
      return done({
        message: 'Passcode is incorrect!',
        type: 'passcode',
      }, false);
    } catch (err) {
      return done( {
        message: 'Authentication failed!',
        type: 'general',
      }, false);
    }
  }),
);

passport.serializeUser((group, done)=> {
  done(null, group._id);
});

passport.deserializeUser((_id, done) => {
  Group.findById(_id, '-passcode -_id', (err, group) => {
    done(err, group);
  });
});
