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
            email: 'testing@testing.com',
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
              5
            );
            assert.deepEqual(
              resp.body.user.email,
              'testing@testing.com'
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
          .post('/api/v1/auth/signup')
          .send({
            email: 'tester@testing.com',
            password: '123456'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            if (!err && resp) {
              request(server)
                .post('/api/v1/auth/login')
                .send({
                  email: 'tester@testing.com',
                  password: '123456'
                })
                .expect('Content-Type', /json/)
                .end((err, innerResp) => {
                  assert.deepEqual(innerResp.status, 200);
                  assert.deepEqual(
                    innerResp.body.message,
                    'login success'
                  );
                  assert.deepEqual(
                    innerResp.body.user.id,
                    6
                  );
                  assert.deepEqual(
                    innerResp.body.user.email,
                    'tester@testing.com'
                  );
                });
            }
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
