import { assert } from 'chai';
import request from 'supertest';

import server from '../../build/server';

describe('businesses endpoint', () => {
  describe('create business endpoint', () => {
    it('should not create business without user id', (done) => {
      request(server)
        .post('/api/v1/businesses')
        .send({
          name: 'xx',
          address: '123, gaga',
          location: 'ogun',
          phonenumber: 122424552,
          employees: 8,
          category: 'ride sharing services'
        })
        .expect('Content-Type', /json/)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 401);
          assert.deepEqual(
            resp.body.message,
            'you appear offline, please log in'
          );
          done();
        });
    });
    it(
      'should not create business for accounts with existing business',
      (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            userId: 2,
            name: 'xx',
            address: '123, gaga',
            location: 'ogun',
            phonenumber: 122424552,
            employees: 8,
            category: 'ride sharing services'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'business exists for user, update business as an alternative'
            );
            done();
          });
      }
    );
    it('should successfully add a business for a user', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@testing.com',
          password: '123456'
        })
        .expect('Content-Type', /json/)
        .end((err, resp) => {
          if (!err && resp) {
            request(server)
              .post('/api/v1/businesses')
              .send({
                userId: resp.body.user.id,
                name: 'test business',
                address: '123, gaga',
                location: 'ogun',
                phonenumber: 122424552,
                employees: 8,
                category: 'ride sharing services'
              })
              .expect('Content-Type', /json/)
              .end((err, innerResp) => {
                assert.deepEqual(resp.status, 201);
                assert.deepEqual(
                  innerResp.body.message,
                  'business sucessfully added'
                );
                assert.deepEqual(
                  innerResp.body.business.id,
                  resp.body.user.id
                );
                assert.deepEqual(
                  innerResp.body.business.name,
                  'test business'
                );
                assert.deepEqual(
                  innerResp.body.business.category,
                  'ride sharing services'
                );
              });
          }
          done();
        });
    });
  });
  describe('update business endpoint', () => {
    it('should not update without a user id', (done) => {
      request(server)
        .put('/api/v1/businesses/1')
        .send({
          name: 'specimen b',
          employees: 16
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 401);
          assert.deepEqual(
            resp.body.message,
            'you appear offline, please log in'
          );
          done();
        });
    });
    it('should update business successfully with user id', (done) => {
      request(server)
        .put('/api/v1/businesses/1')
        .send({
          userId: 1,
          name: 'specimen b',
          employees: 16
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 201);
          assert.deepEqual(
            resp.body.message,
            'business sucessfully updated'
          );
          assert.deepEqual(
            resp.body.business.name,
            'specimen b'
          );
          assert.deepEqual(
            resp.body.business.employees,
            16
          );
          done();
        });
    });
    it(
      'should not update business, when business is not registered',
      (done) => {
        request(server)
          .post('/api/v1/auth/signup')
          .send({
            email: 'reggytest@test.com',
            password: '09876528'
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 201);
            request(server)
              .put(`/api/v1/businesses/${resp.body.user.id}`)
              .send({
                userId: `${resp.body.user.id}`,
                name: 'specimen b1',
                employees: 6
              })
              .end((err, innerResp) => {
                assert.deepEqual(
                  innerResp.status,
                  404
                );
                assert.deepEqual(
                  innerResp.body.message,
                  'no business to update, register business first'
                );
              });
            done();
          });
      }
    );
  });
  describe('delete business end point', () => {
    it('should not delete without a user id', (done) => {
      request(server)
        .delete('/api/v1/businesses/1')
        .end((err, resp) => {
          assert.deepEqual(resp.status, 401);
          assert.deepEqual(
            resp.body.message,
            'you appear offline, please log in'
          );
          done();
        });
    });
    it('should not delete when business belongs to another user', (done) => {
      request(server)
        .delete('/api/v1/businesses/1')
        .send({
          userId: 2
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 404);
          assert.deepEqual(
            resp.body.message,
            'no business to delete'
          );
          done();
        });
    });
    it('should successfully delete business if it belongs to user', (done) => {
      request(server)
        .delete('/api/v1/businesses/1')
        .send({
          userId: 1
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 200);
          assert.deepEqual(
            resp.body.message,
            'business sucessfully deleted'
          );
          assert.deepEqual(
            resp.body.business.name,
            undefined
          );
          done();
        });
    });
  });
  describe('fetch business(s) endpoint', () => {
    it('should successfully fetch business if it exists', (done) => {
      request(server)
        .get('/api/v1/businesses/2')
        .end((err, resp) => {
          assert.deepEqual(resp.status, 200);
          assert.deepEqual(
            resp.body.message,
            'business sucessfully fetched'
          );
          assert.deepEqual(
            resp.body.business.id,
            2
          );
          assert.deepEqual(
            resp.body.business.name,
            'doe-doe'
          );
          done();
        });
    });
    it('should return error if business does not exists', (done) => {
      request(server)
        .get('/api/v1/businesses/1')
        .end((err, resp) => {
          assert.deepEqual(resp.status, 404);
          assert.deepEqual(
            resp.body.message,
            'no business found'
          );
          done();
        });
    });
  });
  describe('fetch all / filter endpoint', () => {
    it(
      'should return all businesses if no query parameter is added to request',
      (done) => {
        request(server)
          .get('/api/v1/businesses')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'businesses successfully fetched'
            );
            assert.deepEqual(
              resp.body.business[0].name,
              'doe-doe',
            );
            done();
          });
      }
    );
    it(
      'should return all businesses in a location',
      (done) => {
        request(server)
          .get('/api/v1/businesses?location=Abuja')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'business successfully filtered'
            );
            assert.deepEqual(
              resp.body.business[0].location,
              'Abuja'
            );
            done();
          });
      }
    );
    it(
      'should return all businesses in a category',
      (done) => {
        request(server)
          .get('/api/v1/businesses?category=finance')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'business successfully filtered'
            );
            assert.deepEqual(
              resp.body.business[0].category,
              'finance'
            );
            done();
          });
      }
    );
    it(
      'should return appropriate message if no businesses in a location',
      (done) => {
        request(server)
          .get('/api/v1/businesses?location=x')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'no businesses found'
            );
            done();
          });
      }
    );
    it(
      'should return appropriate message if no businesses in a category',
      (done) => {
        request(server)
          .get('/api/v1/businesses?category=y')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'no businesses found'
            );
            done();
          });
      }
    );
    it(
      'should return appropriate message if query is invalid',
      (done) => {
        request(server)
          .get('/api/v1/businesses?foo=bar')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 400);
            assert.deepEqual(
              resp.body.message,
              'invalid query'
            );
            done();
          });
      }
    );
  });
  describe('review endpoint', () => {
    it(
      'should not allow empty review',
      (done) => {
        request(server)
          .post('/api/v1/businesses/2/reviews')
          .send({
            name: 'reviewer x',
            review: ' '
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 401);
            assert.deepEqual(
              resp.body.message,
              'review cannot be empty'
            );
            done();
          });
      }
    );
    it(
      'should successfully review an existent business',
      (done) => {
        request(server)
          .post('/api/v1/businesses/2/reviews')
          .send({
            name: 'reviewer x',
            review: 'xyz'
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 201);
            assert.deepEqual(
              resp.body.message,
              'businesses sucessfully reviewed'
            );
            assert.deepEqual(
              resp.body.review.review,
              'xyz'
            );
            done();
          });
      }
    );
    it(
      'should fail to review a non-existent business',
      (done) => {
        request(server)
          .post('/api/v1/businesses/9/reviews')
          .send({
            name: 'reviewer y',
            review: 'yz'
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'cannot review a non-existent business'
            );
            done();
          });
      }
    );
    it(
      'should retrieve a business reviews sucessfully',
      (done) => {
        request(server)
          .get('/api/v1/businesses/2/reviews')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'reviews sucessfully retrieved'
            );
            assert.deepEqual(
              resp.body.reviews.length,
              3
            );
            done();
          });
      }
    );
  });
});
