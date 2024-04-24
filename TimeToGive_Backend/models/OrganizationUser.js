const mongoose = require('mongoose');

const organizationUserSchema = new mongoose.Schema({
  orgName: String,
  email: { type: String, unique: true },
  orgID: String, // RO/CUI sau un identificator unic
  password: String,
});

module.exports = mongoose.model('OrganizationUser', organizationUserSchema, 'OrganizationsUsers');