const mongoose = require('mongoose');

const organizationUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  orgID: String, // RO/CUI sau un identificator unic
  password: String,
  image: String,
  mobile: String,
  profileDescription: String
});

module.exports = mongoose.model('OrganizationUser', organizationUserSchema, 'OrganizationsUsers');
