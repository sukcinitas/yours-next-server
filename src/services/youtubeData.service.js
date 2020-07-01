const axios = require('axios');
require('dotenv').config();

const key = process.env.GOOGLE_API_KEY;
// delete defaults later
const YoutubeDataService = {
  async search({ phrase, pageToken }) {
    try {
      return await axios.get(`https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&q=${phrase}&maxResults=10&key=${key}&pageToken=${pageToken}`);
    } catch (err) {
      throw Error(err.message);
    }
  },
  async getPlaylists({ channelId, pageToken }) {
    try {
      return await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=10&key=${key}&pageToken=${pageToken}`);
    } catch (err) {
      throw Error(err.message);
    }
  },
  async getPlaylistItems({ playlistId, pageToken }) {
    try {
      return await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?&part=snippet&playlistId=${playlistId}&maxResults=10&key=${key}&pageToken=${pageToken}`);
    } catch (err) {
      throw Error(err.message);
    }
  },
  // idList format is id separated by commas
  async getVideos({ idList, pageToken }) {
    try {
      console.log('doing it');
      return await axios.get(`https://www.googleapis.com/youtube/v3/videos?&part=snippet&id=${idList}&maxResults=10&key=${key}&pageToken${pageToken}`);
    } catch (err) {
      throw Error(err.message);
    }
  },
};

module.exports = YoutubeDataService;
