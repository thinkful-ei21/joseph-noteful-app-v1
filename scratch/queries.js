'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
// const updateObj = {
//   title: 'New Title',
//   content: 'Blah blah blah'
// };

// notes.update(1005, updateObj, (err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   } else {
//     console.log('not found');
//   }
// });

// const newObj = {
//   title: '47 reasons why cats are cool, I guess...',
//   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
// };

// notes.create(newObj, (err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   } else {
//     console.log('could not add item');
//   }
// });

notes.delete(1009, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('could not find item to delete');
  }
});