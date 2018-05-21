'use strict';

// Load express
const express = require('express');

const app = express();

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// ADD STATIC SERVER HERE
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

// INSERT EXPRESS APP CODE HERE...

