const axios = require('axios');

const key = process.env.GOOGLE_API_KEY;
// delete defaults later
const YoutubeDataService = {
  async search(phrase = 'bebin', pageToken) {
    try {
      return await axios.get(`https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&q=${phrase}&maxResults=10&key=${key}&pageToken=${pageToken}`);
    } catch (err) {
      throw Error(err);
    }
  },
  async getPlaylists(channelId = 'UCazpYHBPTXKy9t9E78yuWnQ', pageToken) {
    try {
      return await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=10&key=${key}&pageToken=${pageToken}`);
    } catch (err) {
      throw Error(err);
    }
  },
  async getPlaylistItems(playlistId = 'PLcCyuE3mscVGB_LflsnXjliFKms77apx0', pageToken) {
    try {
      return await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?&part=snippet&playlistId=${playlistId}&maxResults=10&key=${key}&pageToken=${pageToken}`);
    } catch (err) {
      throw Error(err);
    }
  },
  // idList format is id separated by commas
  async getVideos(idList, pageToken) {
    try {
      return await axios.get(`https://www.googleapis.com/youtube/v3/videos?&part=snippet&id=${idList}&maxResults=10&key=${key}&pageToken${pageToken}`);
    } catch (err) {
      throw Error(err);
    }
  },
};

module.exports = YoutubeDataService;
