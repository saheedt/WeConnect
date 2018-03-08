import { assert } from 'chai';
import request from 'supertest';

import server from '../../build/server';

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
            email: 'test@testing.com',
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
      'should create user successfully',
      (done) => {
        request(server)
          .post('/api/v1/auth/signup')
          .send({
            email: 'test@testing.com',
            password: '123456'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 201);
            assert.deepEqual(
              resp.body.message,
              'user registered successfully'
            );
            assert.deepEqual(
              resp.body.user.id,
              3
            );
            assert.deepEqual(
              resp.body.user.email,
              'test@testing.com'
            );
            done();
          });
      }
    );
    it(
      'should login successfully',
      (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'test@testing.com',
            password: '123456'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'login success'
            );
            assert.deepEqual(
              resp.body.user.id,
              3
            );
            assert.deepEqual(
              resp.body.user.email,
              'test@testing.com'
            );
            done();
          });
      }
    );
    it(
      'should not login successfully',
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
