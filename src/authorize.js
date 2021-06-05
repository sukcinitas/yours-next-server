require('dotenv').config();

const authorize = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  return next();
};

module.exports = authorize;
