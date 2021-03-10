const axios = require('axios');

require('dotenv').config();
const key = process.env.GOOGLE_API_KEY;

const YoutubeDataService = {
  async search({ phrase, pageToken }) {
    return axios.get(
      `https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&q=${phrase}&maxResults=10&key=${key}&pageToken=${pageToken}`
    );
  },

  async getPlaylists({ channelId, pageToken }) {
    return axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=10&key=${key}&pageToken=${pageToken}`
    );
  },

  async getPlaylistItems({ playlistId, pageToken }) {
    return axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?&part=snippet&playlistId=${playlistId}&maxResults=10&key=${key}&pageToken=${pageToken}`
    );
  },

  // idList format is ids separated by commas
  async getVideos({ idList, pageToken }) {
    return axios.get(
      `https://www.googleapis.com/youtube/v3/videos?&part=snippet&id=${idList}&maxResults=10&key=${key}&pageToken${pageToken}`
    );
  },
};

module.exports = YoutubeDataService;
