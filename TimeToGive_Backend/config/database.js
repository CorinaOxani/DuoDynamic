// Fișier: config/database.js
const mongoose = require('mongoose');
const { mongoUrl } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Database Connected');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
