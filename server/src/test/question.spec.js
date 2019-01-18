import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
describe('Test all question endpoint', () => {
  describe('/POST question', () => {
    it('should not post a question without title field', (done) => {
      const question = {
        createdBy: 1,
        meetup: 3,
        title: '',
        body: 'Who is stronger between Naruto and Sasuke?',
      };
      chai.request(app)
        .post('/api/v1/questions')
        .send(question)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.equal('"title" is not allowed to be empty');
          done();
        });
    });

    it('should post a question', (done) => {
      const question = {
        createdBy: 1,
        meetup: 3,
        title: 'naruto and sasuke',
        body: 'Who is stronger between Naruto and Sasuke?',
      };
      chai.request(app)
        .post('/api/v1/questions')
        .send(question)
        .end((err, res) => {
          assert.isObject(res.body, 'is an object of the new question posted');
          expect(res.body.data[0]).to.have.property('user');
          expect(res.body.data[0]).to.have.property('meetup');
          expect(res.body.data[0]).to.have.property('title');
          expect(res.body.data[0]).to.have.property('body');
          done();
        });
    });
  });

  describe('Upvote a question', () => {
    it('should increase the vote property of a question by one', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/3/upvote')
        .end((err, res) => {
          assert.isObject(res.body, 'is an object of the upvoted question');
          expect(res.body.data[0]).to.have.property('meetup');
          expect(res.body.data[0]).to.have.property('title');
          expect(res.body.data[0]).to.have.property('body');
          expect(res.body.data[0]).to.have.property('votes');
          done();
        });
    });
  });

  describe('Downvote a question', () => {
    it('should decrease the vote property of a question by one', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/2/downvote')
        .end((err, res) => {
          assert.isObject(res.body, 'is an object of the upvoted question');
          expect(res.body.data[0]).to.have.property('meetup');
          expect(res.body.data[0]).to.have.property('title');
          expect(res.body.data[0]).to.have.property('body');
          expect(res.body.data[0]).to.have.property('votes');
          done();
        });
    });
  });
});
