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
  
  notes.filter(searchTerm)
    .then(list => {
      if (list) {
        res.json(list);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// Response to request with data.id matching req.params.id
router.get('/notes/:id', (req, res, next) => {

  notes.find(req.params.id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// Replace contents of provided ID endpoint with req.params.body //
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

  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
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

  notes.create(newItem)
    .then(item => {
      if (item){
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

  

router.delete('/notes/:id', (req, res, next) => {
  notes.delete(req.params.id)
    .then(item => {
      if (item){
        console.log('succesfully deleted!');
        res.sendStatus(204);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

  

module.exports = router;