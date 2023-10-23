const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config({ path: './config/config.env' })

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL  ;

mongoose.connect(DB_URL);
  
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


