'use strict';

const express = require('express');
const app = express();

// Import morgan logger
const morgan = require('morgan');

// Import the PORT value from config.js and set it equal to PORT
const {PORT} = require('./config');

// Import router
const router = require('./router/notes.router');

/******* MIDDLEWARE *******/

// Use middleware, morgan, to log every request regardless of endpoint
app.use(morgan('dev'));

// Serve static files from public directory
app.use(express.static('public'));

// Middleware that parses incoming requests that contain JSON and makes them available on req.body
app.use(express.json());

// Mount the router
app.use('/api', router);

/******* ERROR HANDLERS *******/

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