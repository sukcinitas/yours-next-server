const app = require('../../app');
const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

beforeEach(() => {
  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
});
afterEach((done) => mongoose.disconnect(done));

describe('Test the other paths', () => {
  test('It should make a response to the GET method of every other path', () => {
    return request(app)
      .get('/non/existant/path')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('Not found!');
      });
  });
  test('It should make a response to the GET method of / path', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to home page!');
      });
  });
});