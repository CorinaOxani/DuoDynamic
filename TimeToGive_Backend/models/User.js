// Fișier: models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String
});

module.exports = mongoose.model('UserInfo', userSchema,'UserInfo');
