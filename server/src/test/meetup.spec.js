import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

//Test all meetups endpoint
chai.use(chaiHttp);
describe('/Get api/v1/meetups/', () => {
  it('should return all meetups', (done) => {
    chai.request(app)
    .get('/api/v1/meetups')
    .end((error, res) => {
      expect(res).to.have.status(200);
      assert.isArray(res.body.data, 'is an array of meetups');
      expect(res.body.data.length).to.be.equal(3);
      done();
    });
  });
});
