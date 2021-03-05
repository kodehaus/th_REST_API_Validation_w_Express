'use strict';

const express = require('express');

// This array is used to keep track of user records
// as they are created.
const users = [];

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users', (req, res) => {
  res.json(users);
});

// Route that creates a new user.
router.post('/users', (req, res) => {
  // Get the user from the request body.
  const user = req.body;
  const errors = [];
  if(!user.name){
    errors.push(
      {
        name: [{
          message: '"The request body must contain a \"name\" field set to the user\'s name',
          userMessage: 'Please provide a value for "name"'
        }]
      }
    )
  }
  if(!user.email){
    errors.push(
      {
        email: [{
          'message': '"The request body must contain an \"email\" field set to the user\'s email',
          'userMessage': 'Please provide a value for "email"'
        }]
      }
    )
  }
  
  if(errors.length > 0 ){
    res.status(400).json({errors});
  } else {
    // Add the user to the `users` array.
    users.push(user);
    // Set the status to 201 Created and end the response.
    res.status(201).end();
  }

});

module.exports = router;