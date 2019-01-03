import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

//Test all meetups endpoint
chai.use(chaiHttp);
describe('Test all meetups endpoints', ()=> {
  //get all meetups
  describe('/Get api/v1/meetups/', () => {
    it('should return all meetups', (done) => {
      chai.request(app)
      .get('/api/v1/meetups')
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.isArray(res.body.data, 'is an array of meetups');
        expect(res.body.data.length).to.be.equal(3);
        done();
      });
    });
  });
    
  //Test a valid meetup id
  describe('/Get api/v1/meetups/:id', () => {
      it('should return a specific meetup when a valid ID is supplied', (done) => {
        chai.request(app)
        .get('/api/v1/meetups/1')
        .end((err, res) => {
          assert.isObject(res.body, 'is an object containing the meetup details');
          expect(res).to.have.status(200);
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('title');
          expect(res.body.data[0]).to.have.property('happeningOn');
          expect(res.body.data[0]).to.have.property('tags');
        done();
        });
      });
  });

  //valid character but not availiable
  describe('Check for invalid meetup Id', () => {
    it('should return a 404 error', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/2340')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('The meetup with given ID was not found');
          done();
        });
    });
  });

  describe('Test for valid post request', () => {
    it('should create a new meetup', (done) => {
      const newMeetUp = {
        title: 'DevOp Meetup, Ibadan',
        location: 'NLNG Building, UI, Ibadan',
        happeningOn: new Date('12-12-2019'),
        tags: ['coding', 'Test', 'programming', 'Development', 'Web']
      }
      chai.request(app)
      .post('/api/v1/meetups')
      .send(newMeetUp)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('title');
        expect(res.body.data[0]).to.have.property('happeningOn');
        expect(res.body.data[0]).to.have.property('tags');
        assert.isObject(res.body, 'is an object of the new meetup posted');
        done();
      });
    });
  });

  describe('Test for missing field on a new meetup post', () => {
    it('should not create a new meetup and should return an error message', (done) => {
      const newMeetUp = {
        title: 'DevOp Meetup, Ibadan',
        location: '',
        happeningOn: new Date('12-12-2018'),
        tags: ['coding', 'Test', 'programming', 'Development', 'Web']
      }
      chai.request(app)
      .post('/api/v1/meetups')
      .send(newMeetUp)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error')
        expect(res.body.error).to.be.equal('"location" is not allowed to be empty');
      done();
      });
    });
  });

  describe('Test /GET /api/v1/meetups/upcoming endpoint', () => {
    it('should return all upcoming meetups', (done) => {
      chai.request(app)
      .get('/api/v1/meetups/upcoming')
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.isArray(res.body.data, 'is an array of upcoming meetups');
      done();
      });
    });
  });

  describe('Test /POST /api/v1/meetup/:id/rsvp endpoint', () => {
    it('should post a response to meetup RSVP', (done) => {
      const rsvp = {
        meetup: 3,
        user: 1,
        response: 'Yes'
      }
      chai.request(app)
      .post('/api/v1/meetups/3/rsvps')
      .send(rsvp)
      .end((err, res) => {
        assert.isObject(res.body, 'is an object of the response to the rsvp');
        expect(res.body.data[0]).to.have.property('meetup');
        expect(res.body.data[0]).to.have.property('topic');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0].status).to.be.equal('Yes');
      done();
      });
    });
  });
  
});
