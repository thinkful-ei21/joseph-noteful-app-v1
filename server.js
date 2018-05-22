'use strict';

const express = require('express');
const app = express();

// Import morgan logger
const morgan = require('morgan');

// Import the PORT value from config.js and set it equal to PORT
const {PORT} = require('./config');

// Import the requestLogger function from /middleware/logger.js
const {requestLogger} = require('./middleware/logger');

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

// Serve static files from public directory
app.use(express.static('public'));

// Middleware utilizing requestLogger for every route function (ie: log every request)
// Can also use morgan to log
// app.use(requestLogger);
app.use(morgan('common'));

// Response to request with all data unless provided with a searchTerm query
app.get('/api/notes', (req, res) => {
  const {searchTerm} = req.query;
  if (searchTerm) {
    res.json(data.filter(item => item.title.includes(searchTerm)));
  } else {
    res.json(data);
  }
});

// Response to request with data.id matching req.params.id
app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(item => item.id === Number(req.params.id)));
});

// Error handler middleware
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

// Custom error handler middleware
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Initialize server on PORT
app.listen(PORT, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});