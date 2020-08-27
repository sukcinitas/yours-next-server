const app = require('../../app');
const mongoose = require('mongoose');
const request = require('supertest');
const Group = require('../../models/group.model');
require('dotenv').config();

beforeAll(async () => {
  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  await Group.deleteMany({}).exec();
  await Group.create({
    name: 'name',
    passcode: 'passcode',
  });
});
afterAll(async (done) => { 
  await Group.deleteMany({}).exec();
  mongoose.disconnect(done); 
});

describe('Test the /api/group/create path', () => {
  
  test('It should send a response to the POST method, when group creation is successful', async () => {
      const response = await request(app).post('/api/group/create').send({ name: 'another name', passcode: 'passcode' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Group has been successfully created!');
  });

  test('It should send a response to the POST method, when group creation fails, because name is already in use', async () => {
    const response = await request(app).post('/api/group/create').send({ name: 'name', passcode: 'passcode' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Name is already in use!');
  });

  test('It should send a response to the POST method, when group creation fails', async () => {
    const response = await request(app).post('/api/group/create').send({ name: 'other name' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Failed to create the group!');
  });
});

describe('Test the /api/group/authenticate path', () => {
  test('It should send a response to the POST method, when authentication is successful', async () => {
    const response = await request(app).post('/api/group/authenticate').send({ name: 'name', passcode: 'passcode' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Authentication succeeded!');
  });

  test('It should send a response to the POST method, when authentication fails, because group is not in db', async () => {
    const response = await request(app).post('/api/group/authenticate').send({ name: 'other name', passcode: 'passcode' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Group with this name is not found!');
  });

  test('It should send a response to the POST method, when authentication fails, because passcode is incorrect', async () => {
    const response = await request(app).post('/api/group/authenticate').send({ name: 'name', passcode: 'incorrectPasscode' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Passcode is incorrect!');
  });

  test('It should send a response to the POST method, when authentication fails', async () => {
    const response = await request(app).post('/api/group/authenticate').send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Authentication failed!');
  });
});