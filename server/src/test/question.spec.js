import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
describe('Test all question endpoint', () => {
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

  describe('Upvote a question', () => {
    it('should increase the vote property of a question', (done) => {
      const question = {
        meetup: 3,
        title: 'Uchiha and Senju Clan',
        body: 'Which clan has the highest potential between the uchiha and senju clan?',
        vote: 19
      }
      chai.request(app)
      .patch('/api/questions/:id/upvote')
      .send(question)
      .end((req, res) => {
        assert.isObject(res.body, 'is an object of the upvoted question')
        expect(res.body.data[0]).to.have.property('meetup');
        expect(res.body.data[0]).to.have.property('title');
        expect(res.body.data[0]).to.have.property('body');
        expect(res.body.data[0]).to.have.property('vote');
        expect(res.body.data[0].vote).to.be.equal(20);
      done();
      });
    });
  });

});

  
