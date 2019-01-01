// import express from 'express'
import express from 'express';
import meetups from '../../data/meetups';

const meetupRoute = express.Router();

// for parsing application/json
// meetupRoute.use(json());

// // for parsing application/x-ww-form-urlencoded
// meetupRoute.use(urlencoded());

meetupRoute.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: meetups,
  });
});

export default meetupRoute;
