const passport = require('passport');
const { compareSync } = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const Group = require('./models/group.model');
const GroupService = require('./services/group.service');

passport.use(
  new LocalStrategy({
    usernameField: 'name',
    passwordField: 'passcode',
  }, async (name, passcode, done) => {
    try {
      if (!name || !passcode) {
        done({
          message: 'Bad request! Authentication failed!',
          type: 'general',
          status: 400,
        }, false);
        return;
      }
      const group = await GroupService.getGroupInfo(name);
      if (!group) {
        done({
          message: 'Group with this name is not found!',
          type: 'name',
          status: 401,
        }, false);
        return;
      }
      if (compareSync(passcode, group.passcode)) {
        return done(null, group);
      }
      done({
        message: 'Passcode is incorrect!',
        type: 'passcode',
        status: 401,
      }, false);
      return;
    } catch (err) {
      done({
        message: 'Authentication failed!',
        type: 'general',
        status: 500,
      }, false);
    }
  }),
);

passport.serializeUser((group, done) => {
  done(null, group.id);
});

passport.deserializeUser((_id, done) => {
  Group.findById(_id, '-passcode -_id', (err, group) => {
    done(err, group);
  });
});
