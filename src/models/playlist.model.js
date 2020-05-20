const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  items: Array,
  createdBy: {
    type: String,
    required: true,
  },
});

const Playlist = mongoose.model('playlist', playlistSchema);

module.exports = Playlist;
