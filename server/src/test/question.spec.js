import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

//Test all meetups endpoint
chai.use(chaiHttp);
describe('/POST question', () => {
  it('should not post a question without title field', (done) => {
    const question = {
      user: 1,
      meetup: 3,
      title: '',
      "body of question": 'Who is stronger between Naruto and Sasuke?'
    };
    chai.request(app)
    .post('/api/v1/questions')
    .send(question)
    .end((req, res) => {
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.be.equal('"title" is not allowed to be empty');
      done();
    });
  });

  it('should post a question', (done) => {
    const question = {
      user: 1,
      meetup: 3,
      title: 'naruto and sasuke',
      "body of question": 'Who is stronger between Naruto and Sasuke?'
    };
    chai.request(app)
    .post('/api/v1/questions')
    .send(question)
    .end((req, res) => {
      assert.isObject(res.body, 'is an object of the new question posted');
      expect(res.body.data[0]).to.have.property('user');
      expect(res.body.data[0]).to.have.property('meetup');
      expect(res.body.data[0]).to.have.property('title');
      expect(res.body.data[0]).to.have.property('body');
    done();
    });
  });

});
