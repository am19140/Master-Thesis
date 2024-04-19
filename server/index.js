// Imports
const express = require('express');
const swaggerAPIRouter = require('./routes/swaggerAPIRouter');

// Initiliazing
const app = express();

//Middlewares
app.get('/api/httpclient', )

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!',swaggerAPIRouter);
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
