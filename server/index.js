// Imports
import express from 'express';
import swaggerAPIRouter from './routes/swaggerAPIRouter.js';

// Initiliazing
const app = express();

//Middlewares
app.get('/api/httpclient', )

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!',swaggerAPIRouter);
});

app.use('/api', swaggerAPIRouter);



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
