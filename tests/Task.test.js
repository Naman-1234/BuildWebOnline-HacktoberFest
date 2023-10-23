const request = require('supertest');
const { app } = require('../app');
const Task = require('../models/Files');
const {
  firstUserDocument1,
  firstUserDocument2,
  firstAuthenticatedUser,
  setUpDatabase,
} = require('./fixtures/db');
/***
 *
 * Mainly tests deal with errors that can come if any code gets broke on the server side,and
 * to deal with the authentication part
 */
beforeEach(setUpDatabase);
test('User should be able to fetch all its documents', async () => {
  const response = await request(app)
    .get('/users/documents')
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});

test('Non-existent user should not be able to fetch the documents', async () => {
  const response = await request(app)
    .get('/users/documents')
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(401);
});

