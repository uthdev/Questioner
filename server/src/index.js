import express from 'express';
import meetupRoute from './routes/meetups/meetupRoutes';
import questionRoute from './routes/questions/questionRoutes';

const app = express();

// support parsing of application/json type post data
app.use(express.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded());

app.get('/api/v1/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Questioner App' });
});
//meetup route
app.use('/api/v1/meetups', meetupRoute);

//question route
app.use('/api/v1/questions', questionRoute);

// set port for server to listen on
const port = process.env.PORT || 5000;

// Subscribe server to a particular port
app.listen(port, () => console.log(`Server running on port ${port}...`));

export default app;
