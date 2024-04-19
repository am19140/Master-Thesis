const express = require('express');
const app = express();
const http = require('http');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
