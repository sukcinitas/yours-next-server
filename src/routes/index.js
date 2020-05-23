const app = require('express')();

app.use('/data', require('./data.route'));
app.use('/group', require('./group.route'));
app.use('/playlists', require('./playlist.route'));


module.exports = app;
