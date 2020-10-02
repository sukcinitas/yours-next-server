const app = require('../../app');
const mongoose = require('mongoose');
const request = require('supertest');
const Group = require('../../models/group.model');
const Playlist = require('../../models/playlist.model');
require('dotenv').config();

beforeAll(async () => {
  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true, useFindAndModify: false  });
  await Playlist.deleteMany({}).exec();
  await Group.deleteMany({}).exec();
  await Group.create({
    name: 'name',
    passcode: 'passcode',
  });
  await Playlist.create({
    title: 'Title',
    items: ['videoId', 'videoId3'],
    createdBy: 'name',
  });
});
afterAll(async (done) => { 
  await Playlist.deleteMany({}).exec();
  await Group.deleteMany({}).exec();
  mongoose.disconnect(done); 
});

describe('Test the /api/playlists path', () => {
  test('It should send a response to the GET method, when successful', async () => {
    const response = await request(app).get('/api/playlists?group=name');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.playlists[0]).toHaveProperty('_id');
    expect(response.body.playlists[0]).toHaveProperty('items', ['videoId', 'videoId3']);
    expect(response.body.playlists).toHaveLength(1);
    expect(response.body.playlists[0].createdBy).toBe('name');
    expect(response.body.playlists[0].title).toBe('Title');
  });

  test('It should send a response to the POST method, when playlist creation succeeds', async () => {
    const response = await request(app).post('/api/playlists').send({ title: 'title2', createdBy: 'name' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Playlist has been successfully created!');
  });

  test('It should send a response to the POST method, when playlist creation fails', async () => {
    const response = await request(app).post('/api/playlists').send({ title: 'title2' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Could not create playlist!');
  });
});

describe('Test the /api/playlists/:id/removeItem path', () => {
  // const id = (await Playlist.find({ createdBy: 'name' }))[0]._id;
  test('It should send a response to the PUT method, when unsuccessful', async () => {
    const response = await request(app).put(`/api/playlists/0/removeItem`).send({ items: ['videoId3'] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Could not delete playlist item(s)!');
  });

  test('It should send a response to the PUT method, when no items to delete are send', async () => {
    const id = (await Playlist.find({ title: 'Title' }))[0]._id;
    const response = await request(app).put(`/api/playlists/${id}/removeItem`).send({ items: [] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'No item(s) to delete!');
  });

  test('It should send a response to the PUT method, when successful', async () => {
    const id = (await Playlist.find({ title: 'Title' }))[0]._id;
    const response = await request(app).put(`/api/playlists/${id}/removeItem`).send({ items: ['videoId3'] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Item(s) has been successfully deleted!');
  });
});

describe('Test the /api/playlists/:id path', () => {
  test('It should send a response to the GET method, when successful', async () => {
    const id = (await Playlist.find({ createdBy: 'name' }))[0]._id;
    const response = await request(app).get(`/api/playlists/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('playlist');
    expect(response.body.playlist).toHaveProperty('_id');
    expect(response.body.playlist).toHaveProperty('items', ['videoId']);
    expect(response.body.playlist.createdBy).toBe('name');
    expect(response.body.playlist.title).toBe('Title');
  });

  test('It should send a response to the GET method, when unsuccessful', async () => {
    const response = await request(app).get(`/api/playlists/1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Could not get playlist!');
  });

  test('It should send a response to the PUT method, when successful', async () => {
    const id = (await Playlist.find({ createdBy: 'name' }))[0]._id;
    const response = await request(app).put(`/api/playlists/${id}`).send({ item: 'videoId2' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('playlist');
    expect(response.body.playlist).toHaveProperty('_id');
    expect(response.body.playlist).toHaveProperty('items', ['videoId', 'videoId2']);
    expect(response.body.playlist.createdBy).toBe('name');
    expect(response.body.playlist.title).toBe('Title');
  });

  test('It should send a response to the PUT method, when unsuccessful', async () => {
    const response = await request(app).put('/api/playlists/1').send({});
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Could not update playlist!');
  });

  test('It should send a response to the DELETE method, when successful', async () => {
    const id = (await Playlist.find({ createdBy: 'name' }))[0]._id;
    const response = await request(app).delete(`/api/playlists/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Playlist has been successfully deleted!');
  });

  test('It should send a response to the DELETE method, when unsuccessful', async () => {
    const response = await request(app).delete('/api/playlists/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Could not delete playlist!');
  });
});
