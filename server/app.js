const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(bodyParser.json());

// Use the userRoutes for handling user-related requests
app.use('/users', userRoutes);

module.exports = app;