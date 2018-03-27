import { assert } from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';

import server from '../server';
import { User } from '../models';

dotenv.config();
process.env.NODE_ENV = 'test';

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0Ij';
let userId1, testToken1, testToken2, businessId;

describe('un-matched endpoints', () => {
  describe('Invalid Post request', () => {
    it(
      'should display the right message for an invalid POST request',
      (done) => {
        request(server)
          .post('/api/auth/signup')
          .send({
            email: ' ',
            password: 1234567
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(resp.body.message, 'invalid route!');
            done();
          });
      }
    );
  });
  describe('Invalid Get request', () => {
    it(
      'should display the right message for an invalid GET request',
      (done) => {
        request(server)
          .get('/api/businesses')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(resp.body.message, 'invalid route!');
            done();
          });
      }
    );
  });
  describe('Invalid Put request', () => {
    it(
      'should display the right message for an invalid PUT request',
      (done) => {
        request(server)
          .put('/api/businesses/1')
          .send({
            name: 'specimen b',
            employees: 16
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(resp.body.message, 'invalid route!');
            done();
          });
      }
    );
  });
  describe('Invalid Delete request', () => {
    it(
      'should display the right message for an invalid DELETE request',
      (done) => {
        request(server)
          .delete('/api/businesses/1')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(resp.body.message, 'invalid route!');
            done();
          });
      }
    );
  });
});
/** ============== ======================= =================== ============== */

describe('user endpoints', () => {
  describe('manually drop DB data', () => {
    it('should drop all user data', (done) => {
      User.findAll().then((users) => {
        if (Array.isArray(users)) {
          users.forEach((user) => {
            user.destroy();
          });
        }
        done();
      });
    });
  });
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
    it('should not create a user if email is invalid', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'andelagmail.com',
          password: 1234567
        })
        .expect('Content-Type', /json/)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 400);
          assert.deepEqual(
            resp.body.message,
            'invalid credentials, verify credentials and try again'
          );
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
    it(
      'should not create user, if user already exists',
      (done) => {
        request(server)
          .post('/api/v1/auth/signup')
          .send({
            email: process.env.TESTEMAIL1,
            password: process.env.TESTPWORD1
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 400);
            assert.deepEqual(
              resp.body.message,
              'email already exists'
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
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'user not found'
            );
            done();
          });
      }
    );
    it(
      'should not login request with empty email',
      (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: '',
            password: '123456'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 400);
            assert.deepEqual(
              resp.body.message,
              'email cannot be empty or null'
            );
            done();
          });
      }
    );
    it(
      'should not login with wrong credentials',
      (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: process.env.TESTEMAIL1,
            password: 'hahahahuhuhu'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'wrong email or password'
            );
            done();
          });
      }
    );
  });
  describe('password reset endpoint', () => {
    it(
      'should successfully request password reset if email is registered',
      (done) => {
        request(server)
          .post('/api/v1/auth/reset')
          .send({
            email: process.env.TESTEMAIL1
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'password reset link generated, please check email'
            );
            done();
          });
      }
    );
    it(
      'should not successfully request password reset for empty email',
      (done) => {
        request(server)
          .post('/api/v1/auth/reset')
          .send({
            email: ''
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 400);
            assert.deepEqual(
              resp.body.message,
              'invalid identity supplied'
            );
            done();
          });
      }
    );
    it(
      'should not successfully request password reset for invalid email',
      (done) => {
        request(server)
          .post('/api/v1/auth/reset')
          .send({
            email: 'invalid@'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'no user found with this identity'
            );
            done();
          });
      }
    );
    it(
      'should not successfully request password reset for unregistered email',
      (done) => {
        request(server)
          .post('/api/v1/auth/reset')
          .send({
            email: 'c@test.com'
          })
          .expect('Content-Type', /json/)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'no user found with this identity'
            );
            done();
          });
      }
    );
  });
});
/** ============== ======================= =================== ============== */
describe('businesses endpoint', () => {
  describe('create business endpoint', () => {
    it('should not create business without authorization token', (done) => {
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
          assert.deepEqual(resp.status, 403);
          assert.deepEqual(
            resp.body.message,
            'unauthorized user'
          );
          done();
        });
    });
    it('should successfully add a business for a user', (done) => {
      request(server)
        .post('/api/v1/businesses')
        .set('authorization', testToken1)
        .send({
          name: 'test business',
          address: '123, gaga',
          location: 'ogun',
          phonenumber: 122424552,
          employees: 8,
          category: 'ride sharing services'
        })
        .expect('Content-Type', /json/)
        .end((err, resp) => {
          businessId = resp.body.business.id;
          assert.deepEqual(resp.status, 201);
          assert.deepEqual(
            resp.body.message,
            'business successfully added'
          );
          assert.deepEqual(
            resp.body.business.name,
            'test business'
          );
          assert.deepEqual(
            resp.body.business.category,
            'ride sharing services'
          );
          done();
        });
    });
  });
  /** */
  /** */
  describe('update business endpoint', () => {
    it('should not update without authorization token', (done) => {
      request(server)
        .put(`/api/v1/businesses/${businessId}`)
        .send({
          name: 'specimen b',
          employees: 16
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 403);
          assert.deepEqual(
            resp.body.message,
            'unauthorized user'
          );
          done();
        });
    });
    it('should return appropriate message if token is invalid', (done) => {
      request(server)
        .put(`/api/v1/businesses/${businessId}`)
        .set('authorization', invalidToken)
        .send({
          name: 'specimen b',
          employees: 16
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 403);
          assert.deepEqual(
            resp.body.message,
            'invalid token'
          );
          done();
        });
    });
    it('should update business successfully', (done) => {
      request(server)
        .put(`/api/v1/businesses/${businessId}`)
        .set('authorization', testToken1)
        .send({
          name: 'specimen b',
          employees: 16
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 200);
          assert.deepEqual(
            resp.body.message,
            'business successfully updated'
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
            email: process.env.TESTEMAIL2,
            password: process.env.TESTPWORD2
          })
          .end((err, outerResp) => {
            if (outerResp.body.user) {
              testToken2 = outerResp.body.token;
              request(server)
                .put('/api/v1/businesses/80')
                .set('authorization', testToken2)
                .send({
                  name: 'specimen b1',
                  employees: 6
                })
                .end((err, resp) => {
                  assert.deepEqual(
                    resp.status,
                    404
                  );
                  assert.deepEqual(
                    resp.body.message,
                    'no business to update, register business first'
                  );
                  done();
                });
            }
          });
      }
    );
    it('should not update business if it belongs to another user', (done) => {
      request(server)
        .put(`/api/v1/businesses/${businessId}`)
        .set('authorization', testToken2)
        .send({
          name: 'specimen b',
          employees: 16
        })
        .end((err, resp) => {
          assert.deepEqual(resp.status, 401);
          assert.deepEqual(
            resp.body.message,
            'unathorized, business belongs to another user'
          );
          done();
        });
    });
  });
  /** */
  /** */
  describe('fetch business(s) endpoint', () => {
    it('should successfully fetch business if it exists', (done) => {
      request(server)
        .get(`/api/v1/businesses/${businessId}`)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 200);
          assert.deepEqual(
            resp.body.message,
            'business sucessfully fetched'
          );
          assert.deepEqual(
            resp.body.business.id,
            businessId
          );
          assert.deepEqual(
            resp.body.business.name,
            'specimen b'
          );
          done();
        });
    });
    it('should return error if business does not exists', (done) => {
      request(server)
        .get('/api/v1/businesses/200000')
        .end((err, resp) => {
          assert.deepEqual(resp.status, 404);
          assert.deepEqual(
            resp.body.message,
            'business not found'
          );
          done();
        });
    });
  });
  /** */
  /** */
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
              'specimen b',
            );
            assert.deepEqual(
              resp.body.business[0].id,
              businessId
            );
            done();
          });
      }
    );
    it(
      'should return all businesses in a location',
      (done) => {
        request(server)
          .get('/api/v1/businesses?location=ogun')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'business successfully filtered'
            );
            assert.deepEqual(
              resp.body.business[0].location,
              'ogun'
            );
            done();
          });
      }
    );
    it(
      'should return all businesses in a category',
      (done) => {
        request(server)
          .get('/api/v1/businesses?category=ride sharing services')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'business successfully filtered'
            );
            assert.deepEqual(
              resp.body.business[0].category,
              'ride sharing services'
            );
            done();
          });
      }
    );
    it(
      'should return appropriate error message if query matches no record',
      (done) => {
        request(server)
          .get('/api/v1/businesses?location=yobe')
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
  /** */
  /** */
  describe('review endpoint', () => {
    it(
      'should not allow empty review',
      (done) => {
        request(server)
          .post(`/api/v1/businesses/${businessId}/reviews`)
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
      'should not allow empty business identity',
      (done) => {
        request(server)
          .post('/api/v1/businesses/ /reviews')
          .send({
            name: 'reviewer x',
            review: 'xyz'
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 401);
            assert.deepEqual(
              resp.body.message,
              'business identity cannot be empty'
            );
            done();
          });
      }
    );
    it(
      'should return appropriate error if business has no review',
      (done) => {
        request(server)
          .get(`/api/v1/businesses/${businessId}/reviews`)
          .send({
            name: 'reviewer x',
            review: 'xyz'
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'no reviews found'
            );
            done();
          });
      }
    );
    it(
      'should successfully review an existent business',
      (done) => {
        request(server)
          .post(`/api/v1/businesses/${businessId}/reviews`)
          .send({
            name: 'reviewer x',
            review: 'xyz'
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 201);
            assert.deepEqual(
              resp.body.message,
              'business sucessfully reviewed'
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
          .post('/api/v1/businesses/3009/reviews')
          .send({
            name: 'reviewer y',
            review: 'yz'
          })
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'business not found'
            );
            done();
          });
      }
    );
    it(
      'should not retrieve a business reviews if business does not exist',
      (done) => {
        request(server)
          .get('/api/v1/businesses/4334/reviews')
          .end((err, resp) => {
            assert.deepEqual(resp.status, 404);
            assert.deepEqual(
              resp.body.message,
              'business not found'
            );
            done();
          });
      }
    );
    it(
      'should retrieve a business reviews sucessfully',
      (done) => {
        request(server)
          .get(`/api/v1/businesses/${businessId}/reviews`)
          .end((err, resp) => {
            assert.deepEqual(resp.status, 200);
            assert.deepEqual(
              resp.body.message,
              'reviews successfully retrieved'
            );
            assert.deepEqual(
              resp.body.reviews.length,
              1
            );
            done();
          });
      }
    );
  });
  /** */
  /** */
  describe('delete business end point', () => {
    it('should not delete without authorization token', (done) => {
      request(server)
        .delete(`/api/v1/businesses/${userId1}`)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 403);
          assert.deepEqual(
            resp.body.message,
            'unauthorized user'
          );
          done();
        });
    });
    it('should return appropriate error if business is not found', (done) => {
      request(server)
        .delete('/api/v1/businesses/6000000')
        .set('authorization', testToken2)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 404);
          assert.deepEqual(
            resp.body.message,
            'business not found'
          );
          done();
        });
    });
    it('should not delete when business belongs to another user', (done) => {
      request(server)
        .delete(`/api/v1/businesses/${businessId}`)
        .set('authorization', testToken2)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 401);
          assert.deepEqual(
            resp.body.message,
            'unauthorized, business belongs to another user'
          );
          done();
        });
    });
    it(
      'should not delete business, when user doesn\'t exist but token is valid',
      (done) => {
        User.findOne({
          where: {
            email: process.env.TESTEMAIL2
          }
        }).then((user) => {
          if (user) {
            return user.destroy().then(() => {
              request(server)
                .delete('/api/v1/businesses/80')
                .set('authorization', testToken2)
                .end((err, resp) => {
                  assert.deepEqual(
                    resp.status,
                    404
                  );
                  assert.deepEqual(
                    resp.body.message,
                    'user does not exist'
                  );
                  done();
                });
            });
          }
        });
      }
    );
    it('should successfully delete business if it belongs to user', (done) => {
      request(server)
        .delete(`/api/v1/businesses/${businessId}`)
        .set('authorization', testToken1)
        .end((err, resp) => {
          assert.deepEqual(resp.status, 200);
          assert.deepEqual(
            resp.body.message,
            'business sucessfully deleted'
          );
          done();
        });
    });
  });
  /** */
});
