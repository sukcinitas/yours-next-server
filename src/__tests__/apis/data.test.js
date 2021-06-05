const app = require('../../app');
const request = require('supertest');
require('dotenv').config();

describe('Test the /api/data/search path', () => {
  test('It should send a response to the GET method, when it is successful', async () => {
    const response = await request(app).get('/api/data/search?q=bebin');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Test the /api/data/playlist path', () => {
  test('It should send a response to the GET method, when it is succeessful', async () => {
    const response = await request(app).get(
      '/api/data/playlists?channelId=UCazpYHBPTXKy9t9E78yuWnQ'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
  });

  test('It should send a response to the GET method, when it fails', async () => {
    const response = await request(app).get('/api/data/playlists?channelId=1');
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Could not get results!');
    expect(response.body).toHaveProperty('error');
  });
});

describe('Test the /api/data/playlist path', () => {
  test('It should send a response to the GET method, when it is successful', async () => {
    const response = await request(app).get(
      '/api/data/playlistItems?playlistId=PLdKHthnnMgzfnju7k92PM5Gg4Y0FRssVw'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
  });

  test('It should send a response to the GET method, when it fails', async () => {
    const response = await request(app).get(
      '/api/data/playlistItems?playlistId=1'
    );
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Could not get results!');
    expect(response.body).toHaveProperty('error');
  });
});

describe('Test the /api/data/playlist path', () => {
  test('It should send a response to the GET method, when it is successful', async () => {
    const response = await request(app).get(
      '/api/data/videos?idList=TfenCTabhDY'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
  });
});
