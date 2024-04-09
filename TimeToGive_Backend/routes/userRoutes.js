// Fișier: routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const OrganizationUser = require('../models/OrganizationUser');
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ status: "Started" });
});

router.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({ message: "User already exists!" });
    }
    const user = await User.create({ name, email, mobile, password });
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Error creating the user", error: error.message });
  }
});

router.post("/login-user", async (req, res) => {
  //console.log(req.body);
  const { email, password, orgID } = req.body; // Include orgID în request, dacă este disponibil
  try {
    let user;
    if (orgID) {
      user = await OrganizationUser.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).send({ data: "User doesn't exist" });
    }
    if (user.password !== password) {
      return res.status(401).send({ data: "Invalid credentials" });
    }
    res.send({ data: "Login successful", userType: orgID ? "organization" : "individual" });
  } catch (error) {
    res.status(500).send({ data: "An error occurred during the login process" });
  }
});

module.exports = router;