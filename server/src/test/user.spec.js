import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
describe('Test users signup routes', () => {
  describe('/POST api/v1/auth/signup', () => {
    it('should not create account for user if user already has an account', (done) => {
      const data = {
        firstname: 'gbolahan',
        lastname: 'adeleke',
        email: 'testemail92@gmail.com',
        phonenumber: '08156365653',
        password: 'fakepassword',
        confirmPassword: 'fakepassword',
        username: 'johndoe'
      };
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Account already exist')
        done();
      });
    });
  });

});

describe('Test signin endpoints', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should not log in user when the wrong credentials are provided', (done) => {
      const data = {
        email: 'adelekegbolahan92@yahoo.com',
        password: 'jackjones92'
      }
      chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.equal('Incorrect Password');
        done();
      });
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should not log in user when credentials are incomplete', (done) => {
      const data = {
        email: 'adelekegbolahan92@yahoo.com',
        password: ''
      }
      chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.equal('"password" is not allowed to be empty');
        done();
      });
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should log in user when correct and complete credential is provided', (done) => {
      const data = {
        email: 'adelekegbolahan92@yahoo.com',
        password: 'uthdev92'
      }
      chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('token');
        done();
      });
    })
  })
})

});

