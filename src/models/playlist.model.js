const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
      unique: false,
    },
    items: Array,
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Playlist = mongoose.model('playlist', playlistSchema);

module.exports = Playlist;
