import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
describe('Test all meetups endpoints', () => {
  describe('/Get api/v1/meetups/', () => {
    it('should return all meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups')
        .end((err, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of meetups');
          done();
        });
    });

    // it('should return an error if no meetup exists', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups')
    //     .end((err, res) => {
    //       expect(res).to.have.status(404);
    //       expect(res.body).to.have.property('error');
    //       expect(res.body.error).to.be.equal('No Meetup found');
    //       done();
    //     });
    // });
  });

  describe('/Get api/v1/meetups/:id', () => {
    it('should return a specific meetup when a valid ID is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/27')
        .end((err, res) => {
          assert.isObject(res.body, 'is an object containing the meetup details');
          expect(res).to.have.status(200);
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('topic');
          expect(res.body.data[0]).to.have.property('happeningon');
          expect(res.body.data[0]).to.have.property('tags');
          done();
        });
    });
  });

  describe('Check for invalid meetup Id', () => {
    it('should return an error if an Invalid meetup Id is requested', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/-2')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.equal('"id" must be a positive number');
          done();
        });
    });

    it('should return a 404 error if the requested meetup does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/2340')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Meetup not found');
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
        tags: ['coding', 'Test', 'programming', 'Development', 'Web'],
      };
      chai.request(app)
        .post('/api/v1/meetups')
        .send(newMeetUp)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('topic');
          expect(res.body.data[0]).to.have.property('happeningon');
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
        tags: ['coding', 'Test', 'programming', 'Development', 'Web'],
      };
      chai.request(app)
        .post('/api/v1/meetups')
        .send(newMeetUp)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
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

    // it('should return an error if no Upcoming meetup', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups/upcoming')
    //     .end((err, res) => {
    //       expect(res).to.have.status(404);
    //       expect(res.body).to.have.property('error');
    //       expect(res.body.error).to.be.equal('No Upcoming meetups');
    //       done();
    //     });
    // });
  });

  describe('Test POST /api/v1/meetups/:id/rsvps', () => {
    it('should return an error when invalid data is supplied', (done) => {
      const rsvp = {
        meetupId: 23,
        userId: 2,
        response: ''
      }
      chai.request(app)
      .post('/api/v1/meetups/24/rsvps')
      .send(rsvp)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('"response" must be one of [yes, no, maybe]');
        done();
      })
    })

    it('should return an error when the requested meetup does not exist', (done) => {
      const rsvp = {
        meetupId: 3,
        userId: 2,
        response: 'maybe'
      }
      chai.request(app)
      .post('/api/v1/meetups/2500/rsvps')
      .send(rsvp)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Meetup not found');
        done();
      })
    })

    it('should return an error when an invalid meetup Id is supplied', (done) => {
      const rsvp = {
        meetupId: -2,
        userId: 2,
        response: 'maybe'
      }
      chai.request(app)
      .post('/api/v1/meetups/-2/rsvps')
      .send(rsvp)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('"id" must be a positive number');
        done();
      })
    })

    it('should return an error if user already responded to the meetup', (done) => {
      const rsvp = {
        meetupId: 24,
        userId: 2,
        response: 'yes'
      }
      chai.request(app)
      .post('/api/v1/meetups/24/rsvps')
      .send(rsvp)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Server error');
        done();
      })
    })
  })

  describe('Test DELETE api/v1/meetups/:id', () => {
    it('should return an error specific when an invalid meetup Id is requested ', (done) => {
      chai.request(app)
        .delete('/api/v1/meetups/-2')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.equal('"id" must be a positive number');
          done();
        });
    });
    
    it('should return a 404 error if the requested meetup does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/meetups/2340')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Meetup not found');
          done();
        });
    });

    // it('should delete a meetup if a valid an existing valid Id is supplied', (done) => {
    //   chai.request(app)
    //     .delete('/api/v1/meetups/29')
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.have.property('data');
    //       expect(res.body.data[0]).to.equal("Successfully deleted the Meetup");
    //       done();
    //     });
    // });
  });

});
