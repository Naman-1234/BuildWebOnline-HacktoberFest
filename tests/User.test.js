const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../app');
const User = require('../models/User');
const {
  firstAuthenticatedUser,
  firstUnauthenticatedUser,
  firstUnauthenticatedUserId,
  firstUserAuthenticatedId,
  setUpDatabase,
} = require('./fixtures/db');

beforeEach(setUpDatabase);
/***
 *
 * Mainly tests deal with errors that can come if any code gets broke on the server side,and
 * to deal with the authentication part
 */
test('should sign up a user', async () => {
  await request(app)
    .post('/users/signup')
    .send({
      name: 'signup',
      email: 'singup@gmail.com',
      password: 'signup-signup',
      gender: 'Male',
      phoneNo: '1234567890',
    })
    .expect(201);
});
//CHecking if who is  registered on our website could login
test('Authenticated User should be able to log in ', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: firstAuthenticatedUser.email,
      password: firstAuthenticatedUser.password,
    })
    .expect(200);
});
