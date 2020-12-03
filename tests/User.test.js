const Chai = require('chai');
const ChaiHTTP = require('chai-http');
const { describe, it: test } = require('mocha');
const app = require('../server');

Chai.should();
Chai.use(ChaiHTTP);

const randomString = Math.random().toString(36).substring(2);

const user = {
  name: 'Test Testson',
  email: randomString+'@test.com',
  password: randomString
}

let token = '';

describe('Testing of user-routes', () => {
  
  describe('POST /user (Create new user)', () => {
    test('User should be created, and return user-data', done => {
      Chai.request(app)
        .post('/user')
        .send(user)
        .end((req, res) => {
          res.should.have.a.status(201);
          res.body.name.should.equal(user.name);
          res.body.email.should.equal(user.email);
          done();
        })
    })
  })

  describe('GET /users (Not signed in)', () => {
    test('Should return 403 status', done => {
      Chai.request(app)
        .get('/users')
        .end((req, res) => {
          res.should.have.a.status(403);
          done();
        });
    });
  });

  describe('POST /auth (Sign in)', () => {
    test('User should sign in', done => {
      Chai.request(app)
        .post('/auth')
        .send(user)
        .end((req, res) => {
          res.should.have.a.status(200);
          res.body.should.have.property('token');
          token = res.body.token; // Save token for upcoming tests
          user.id = res.body.id;  // Save id for upcoming tests
          done();
        });
    });
  });

  describe('GET /users', () => {
    test('Should return all users', done => {
      Chai.request(app)
        .get('/users')
        .set('x-access-token', token)
        .end((req, res) => {
          res.should.have.a.status(200);
          res.body.should.be.an('array');
          res.body.forEach(user => {
            user.should.have.property('id');
            user.should.have.property('name');
            user.should.have.property('email');
          });
          done();
        });
    });
  });

  describe('PUT /user', () => {
    test('Should update the users name', done => {
      Chai.request(app)
        .put('/user')
        .send({ id: user.id, name: 'Uncle Tester' })
        .set('x-access-token', token)
        .end((req, res) => {
          res.should.have.a.status(200);
          res.body.name.should.equal('Uncle Tester');
          done();
        })
    });
  });

  describe('DELETE /user', () => {
    test('Should delete user', done => {
      Chai.request(app)
        .delete('/user')
        .send({ id: user.id })
        .set('x-access-token', token)
        .end((req, res) => {
          res.should.have.a.status(200);
          res.body.message.should.contain('deleted');
          done();
        })
    });
  });

})