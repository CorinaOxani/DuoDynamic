// Fișier: routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const OrganizationUser = require('../models/OrganizationUser');
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ status: "Started" });
});

router.post("/register", async (req, res) => {
  const { name, email, mobile, password, country, city, profileDescription, image} = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({ message: "User already exists!" });
    }
    const user = await User.create({
      name, email, mobile, password, country, city, profileDescription, image, personalProjects: []
    });
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
    res.send({
      data: "Login successful",
      _id: user._id,
      userType: orgID ? "organization" : "individual",
      email: user.email, 
      name: user.name,  
      mobile: user.mobile,
      country: user.country,
      city: user.city,
      profileDescription: user.profileDescription,
      image: user.image,
      personalProjects: user.personalProjects

    });
  } catch (error) {
    res.status(500).send({ data: "An error occurred during the login process" });
  }
});

router.put("/update-user/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  const updates = req.body;

  try {
    // Attempt to update a regular user
    let user = await User.findOneAndUpdate({ email: userEmail }, { $set: updates }, { new: true });
    
    // If not found, try updating an organization user
    if (!user) {
      user = await OrganizationUser.findOneAndUpdate({ email: userEmail }, { $set: updates }, { new: true });
    }

    // If no user is found in either collection, return an error
    if (!user) {
      console.log("User not found:", userEmail);
      return res.status(404).send({ message: "User not found" });
    }

    // Successfully updated
    console.log("User updated successfully for user:", userEmail);
    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Error updating user", error: error.message });
  }
});



module.exports = router;