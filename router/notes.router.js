'use strict';

const express = require('express');
const router = express.Router();

// Load array of notes
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);



/******* ENDPOINTS *******/

// Response to request with all data unless provided with a searchTerm query
router.get('/notes', (req, res, next) => {
  const {searchTerm} = req.query;
  
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // hunts down the error handler ignoring all route functions that follow
    }
    res.json(list); // response with a JSONified filtered array
  });
});

// Response to request with data.id matching req.params.id
router.get('/notes/:id', (req, res, next) => {

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

// PLACEHOLDER COMMENT //
router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  // Never trust users - validate input //
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

router.post('/notes', (req, res, next) => {
  const {title, content} = req.body;

  const newItem = {title, content};

  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

router.delete('/notes/:id', (req, res, next) => {
  notes.delete(req.params.id, (err, item) => {
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

module.exports = router;