

const _chai = require('chai');

const _chai2 = _interopRequireDefault(_chai);

const _chaiHttp = require('chai-http');

const _chaiHttp2 = _interopRequireDefault(_chaiHttp);

const _index = require('../index');

const _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Test all meetups endpoint
_chai2.default.use(_chaiHttp2.default);
describe('Test all meetups endpoints', () => {
  // get all meetups
  describe('/Get api/v1/meetups/', () => {
    it('should return all meetups', (done) => {
      _chai2.default.request(_index2.default).get('/api/v1/meetups').end((err, res) => {
        (0, _chai.expect)(res).to.have.status(200);
        _chai.assert.isArray(res.body.data, 'is an array of meetups');
        (0, _chai.expect)(res.body.data.length).to.be.equal(3);
        done();
      });
    });
  });

  // Test a valid meetup id
  describe('/Get api/v1/meetups/:id', () => {
    it('should return a specific meetup when a valid ID is supplied', (done) => {
      _chai2.default.request(_index2.default).get('/api/v1/meetups/1').end((err, res) => {
        _chai.assert.isObject(res.body, 'is an object containing the meetup details');
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data[0]).to.have.property('id');
        (0, _chai.expect)(res.body.data[0]).to.have.property('topic');
        (0, _chai.expect)(res.body.data[0]).to.have.property('happeningOn');
        (0, _chai.expect)(res.body.data[0]).to.have.property('tags');
        done();
      });
    });
  });

  // valid character but not availiable
  describe('Check for invalid meetup Id', () => {
    it('should return a 404 error', (done) => {
      _chai2.default.request(_index2.default).get('/api/v1/meetups/2340').end((err, res) => {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error).to.equal('The meetup with given ID was not found');
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
      _chai2.default.request(_index2.default).post('/api/v1/meetups').send(newMeetUp).end((err, res) => {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data[0]).to.have.property('id');
        (0, _chai.expect)(res.body.data[0]).to.have.property('topic');
        (0, _chai.expect)(res.body.data[0]).to.have.property('happeningOn');
        (0, _chai.expect)(res.body.data[0]).to.have.property('tags');
        _chai.assert.isObject(res.body, 'is an object of the new meetup posted');
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
      _chai2.default.request(_index2.default).post('/api/v1/meetups').send(newMeetUp).end((err, res) => {
        (0, _chai.expect)(res).to.have.status(422);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error).to.be.equal('"location" is not allowed to be empty');
        done();
      });
    });
  });

  describe('Test /GET /api/v1/meetups/upcoming endpoint', () => {
    it('should return all upcoming meetups', (done) => {
      _chai2.default.request(_index2.default).get('/api/v1/meetups/upcoming').end((err, res) => {
        (0, _chai.expect)(res).to.have.status(200);
        _chai.assert.isArray(res.body.data, 'is an array of upcoming meetups');
        done();
      });
    });
  });

  describe('Test /POST /api/v1/meetup/:id/rsvp endpoint', () => {
    it('should post a response to meetup RSVP', (done) => {
      const rsvp = {
        meetup: 3,
        user: 1,
        response: 'yes',
      };
      _chai2.default.request(_index2.default).post('/api/v1/meetups/3/rsvps').send(rsvp).end((err, res) => {
        _chai.assert.isObject(res.body, 'is an object of the response to the rsvp');
        (0, _chai.expect)(res.body.data[0]).to.have.property('meetup');
        (0, _chai.expect)(res.body.data[0]).to.have.property('topic');
        (0, _chai.expect)(res.body.data[0]).to.have.property('status');
        (0, _chai.expect)(res.body.data[0].status).to.be.equal('yes');
        done();
      });
    });
  });
});
