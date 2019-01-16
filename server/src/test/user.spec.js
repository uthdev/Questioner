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