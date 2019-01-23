import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
describe('Test users signup routes', () => {
  describe('/POST api/v1/auth/signup', () => {
    // it('should create a new account if user email and password is not in the database', (done) => {
    //   const data = {
    //     firstname: 'gbolahan',
    //     lastname: 'adeleke',
    //     email: 'testemail09@gmail.com',
    //     phonenumber: '08156365653',
    //     password: 'fakepassword',
    //     confirmPassword: 'fakepassword',
    //     username: 'johndoe09'
    //   };
    //   chai.request(app)
    //   .post('/api/v1/auth/signup')
    //   .send(data)
    //   .end((_err, res) => {
    //     expect(res).to.have.status(201);
    //     expect(res.body).to.have.property('data');
    //     expect(res.body.data[0]).to.have.property('token');
    //     expect(res.body.data[0]).to.have.property('user');
    //     assert.isObject(res.body.data[0].user, 'is an object of the user data')
    //     done();
    //   });
    // });

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
      .end((_err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Account already exist')
        done();
      });
    });

    it('should not create account for user if user data are not properly filled', (done) => {
      const data = {
        firstname: 'gbolahan',
        lastname: 'adeleke',
        email: 'testemail92@gmail.com',
        phonenumber: '08156365653',
        password: 'fakepassword',
        confirmPassword: 'fakpassword',
        username: 'johndoe'
      };
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((_err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('"confirmPassword" must be one of [ref:password]')
        done();
      });
    });

    it('should not create account for user if user namename has already been taken', (done) => {
      const data = {
        firstname: 'gbolahan',
        lastname: 'adeleke',
        email: 'testemail00@gmail.com',
        phonenumber: '08156365653',
        password: 'fakepassword',
        confirmPassword: 'fakepassword',
        username: 'johndoe'
      };
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((_err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Username already exist')
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
      .end((_err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.equal('Invalid Password');
        done();
      });
    })

    it('should return error if password does not exist in the database', (done) => {
      const data = {
        email: 'adelekegbolahan44@yahoo.com',
        password: 'jackjones92'
      }
      chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((_err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.be.equal('Account not found');
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
      .end((_err, res) => {
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
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data[0]).to.have.property('token');
        expect(res.body.data[0]).to.have.property('user');
        done();
      });
    })
  })
})