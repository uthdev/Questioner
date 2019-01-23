import express from 'express';
import meetupRoute from './routes/meetups/meetupRoutes';
import questionRoute from './routes/questions/questionRoutes';
import usersRoutes from './routes/users/usersRoutes';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Questioner App' });
});

app.use('/api/v1/meetups', meetupRoute);

app.use('/api/v1/questions', questionRoute);

app.use('/api/v1/auth', usersRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Please use "/api/v1/<valid routes>" and ensure to read our API documentation to know all available routes' });
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}...`));

export default app;
