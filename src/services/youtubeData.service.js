const axios = require('axios');

const key = process.env.GOOGLE_API_KEY;

const YoutubeDataService = {
  search(phrase = 'bebin', pageToken) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&q=${phrase}&maxResults=10&key=${key}&pageToken=${pageToken}`);
  },
  getPlaylists(channelId = 'UCazpYHBPTXKy9t9E78yuWnQ', pageToken) {
    return axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=10&key=${key}&pageToken=${pageToken}`);
  },
  async getPlaylistItems(playlistId = 'PLcCyuE3mscVGB_LflsnXjliFKms77apx0', pageToken) {
    return axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?&part=snippet&playlistId=${playlistId}&maxResults=10&key=${key}&pageToken=${pageToken}`);
  },
  getVideos(idList, pageToken) {
    return axios.get(`https://www.googleapis.com/youtube/v3/videos?&part=snippet&id=${idList}&maxResults=10&key=${key}&pageToken${pageToken}`);
  },
};

module.exports = YoutubeDataService;
