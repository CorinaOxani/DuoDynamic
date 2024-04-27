// Fișier: models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  country: String,        
  city: String,           
  profileDescription: String,
  image: String ,
  personalProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectInfo'  // Assuming you have a Project model defined somewhere
  }],   
});

module.exports = mongoose.model('UserInfo', userSchema,'UserInfo');

