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
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectInfo'
  },
  projectName: String  // Adaugă numele proiectului aici
}],
});

module.exports = mongoose.model('UserInfo', userSchema,'UserInfo');

