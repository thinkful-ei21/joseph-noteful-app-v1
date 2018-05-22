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
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);



/******* MIDDLEWARE *******/

// Serve static files from public directory
app.use(express.static('public'));

// Middleware that parses incoming requests that contain JSON and makes them available on req.body
app.use(express.json());

// Middleware utilizing requestLogger for every route function (ie: log every request)
// Can also use morgan to log
app.use(requestLogger);
// app.use(morgan('common'));



/******* ENDPOINTS *******/

// Response to request with all data unless provided with a searchTerm query
app.get('/api/notes', (req, res, next) => {
  const {searchTerm} = req.query;
  
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // hunts down the error handler ignoring all route functions that follow
    }
    res.json(list); // response with a JSONified filtered array
  });
});

// Response to request with data.id matching req.params.id
app.get('/api/notes/:id', (req, res, next) => {

  notes.find(req.params.id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


// //
app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  //Never trust users - validate input //
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

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