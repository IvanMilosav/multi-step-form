const express = require('express');
const User = require('../models/User'); 

const router = express.Router();

// Route to add a user to the database
router.post('/addUser', async (req, res) => {
  try {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        zipCode: req.body.zipCode,
      });
     
      

    await newUser.save();
    res.status(201).json({ message: 'User added to the database.'});
  } catch (error) {
    res.status(500).json({ error: 'Error adding user to the database.' });
    throw error
    
  }
});

// Route to check if a user with a provided email exists in the database
router.get('/checkUser', async (req, res) => {
  try {
    const email = req.query.email;

    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error checking for user in the database.' });
    throw error

  }
});

module.exports = router;