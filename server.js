'use strict';

// Load express
const express = require('express');

const app = express();

// Load array of notes
const data = require('./db/notes');

app.use(express.static('public'));

// ADD STATIC SERVER HERE
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

// INSERT EXPRESS APP CODE HERE...
app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  let filteredData = '';
  if (searchTerm) {
    filteredData = data.filter(item => item.title.includes(searchTerm));
    res.json(filteredData);
  } else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  let id = req.params.id;
  res.json(data.find(item => item.id === Number(id)));
});