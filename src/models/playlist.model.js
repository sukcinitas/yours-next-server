const mongoose, { Schema } = require('mongoose');

const playlistSchema = new Schema({
  name: {
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
  }
});

const Playlist = mongoose.model('playlist', playlistSchema);

module.exports = Playlist;
