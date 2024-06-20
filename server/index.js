// Imports
import express from 'express';
import cors from 'cors';
import swaggerAPIRouter from './routes/swaggerAPIRouter.js';

// Initiliazing
const app = express();

//Middlewares

app.get('/api/httpclient', )

app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!',swaggerAPIRouter);
});

app.use('/api', swaggerAPIRouter);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on port', this.address().port);
});
