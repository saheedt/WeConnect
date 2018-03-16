import { assert } from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';

import server from '../server';

dotenv.config();
process.env.NODE_ENV = 'test';

let userId1, testToken1, testToken2, businessId;

describe('user endpoints', () => {
  describe('create user endpoint', () => {
    it('should not create a user if email is empty', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: ' ',
          password: 1234567
        })
        .expect('Content-Type', /json/)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 400);
          assert.deepEqual(resp.body.message, 'email cannot be empty or null');
          done();
        });
    });
    it(
      'should not create user if password is less than 6 characters',
      (done) => {
        request(server)
          .post('/api/v1/auth/signup')
          .send({
            email: 't@testing.com',
            password: '12345'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 400);
            assert.deepEqual(
              resp.body.message,
              'password should be 6 or more characters long'
            );
            done();
          });
      }
    );
    it(
      'should not create user if password is empty or null',
      (done) => {
        request(server)
          .post('/api/v1/auth/signup')
          .send({
            email: 't@testing.com',
            password: ''
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 400);
            assert.deepEqual(
              resp.body.message,
              'password can not be empty or null'
            );
            done();
          });
      }
    );
    it(
      'should create user successfully',
      (done) => {
        request(server)
          .post('/api/v1/auth/signup')
          .send({
            email: process.env.TESTEMAIL1,
            password: process.env.TESTPWORD1
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            testToken1 = resp.body.token;
            userId1 = resp.body.user.id;
            assert.deepEqual(resp.status, 201);
            assert.deepEqual(
              resp.body.message,
              'user registered successfully'
            );
            assert.deepEqual(
              resp.body.user.id,
              userId1
            );
            assert.deepEqual(
              resp.body.user.password,
              undefined
            );
            assert.deepEqual(
              resp.body.user.email,
              process.env.TESTEMAIL1
            );
            done();
          });
      }
    );
  });
  describe('login user endpoint', () => {
    it(
      'should login successfully',
      (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: process.env.TESTEMAIL1,
            password: process.env.TESTPWORD1
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'login successful'
            );
            assert.deepEqual(
              resp.body.user.id,
              userId1
            );
            assert.deepEqual(
              resp.body.user.email,
              process.env.TESTEMAIL1
            );
            done();
          });
      }
    );
    it(
      'should not login unregisterd user',
      (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'a@b.com',
            password: '123456'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 401);
            assert.deepEqual(
              resp.body.message,
              'kindly sign up first'
            );
            done();
          });
      }
    );
  });
});
/** ============== ======================= =================== ============== */
