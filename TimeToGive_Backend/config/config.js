// Fișier: config/config.js
require("dotenv").config();

module.exports = {
  mongoUrl: process.env.DB_URI,
  port: process.env.PORT || 3000,
};
