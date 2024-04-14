// Fișier: models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  organizer: String,
  email: String,
  mobile: String,
  organization: String,
  country: String,
  address: String,
  startDate: Date,
  image:String
});

module.exports = mongoose.model('ProjectInfo', projectSchema);
