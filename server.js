'use strict';

const express = require('express');
const app = express();

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const {searchTerm} = req.query;
  let filteredData = data.filter(item => item.title.includes(searchTerm));
  if (searchTerm) {
    res.json(filteredData);
  } else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(item => item.id === Number(req.params.id)));
});

app.listen(8080, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});