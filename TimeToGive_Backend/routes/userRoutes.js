const express = require('express');
const User = require('../models/User');
const OrganizationUser = require('../models/OrganizationUser');
const Project = require('../models/Project'); // Asigură-te că ai modelul Project
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ status: "Started" });
});

router.post("/register", async (req, res) => {
  const { name, email, mobile, password, country, city, profileDescription, image } = req.body;
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
  const { email, password, orgID } = req.body;
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

    const responseData = {
      data: "Login successful",
      _id: user._id,
      userType: orgID ? "organization" : "individual",
      email: user.email,
      name: orgID ? user.orgName : user.name,
      mobile: user.mobile,
      country: user.country,
      city: user.city,
      profileDescription: user.profileDescription,
      image: user.image,
      personalProjects: user.personalProjects
    };

    console.log("Login response:", responseData);

    res.send(responseData);
  } catch (error) {
    res.status(500).send({ data: "An error occurred during the login process" });
  }
});

router.put("/update-user/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  const updates = req.body;

  try {
    let user = await User.findOneAndUpdate({ email: userEmail }, { $set: updates }, { new: true });

    if (!user) {
      user = await OrganizationUser.findOneAndUpdate({ email: userEmail }, { $set: updates }, { new: true });
    }

    if (!user) {
      console.log("User not found:", userEmail);
      return res.status(404).send({ message: "User not found" });
    }

    console.log("User updated successfully for user:", userEmail);
    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Error updating user", error: error.message });
  }
});

router.get("/current-organization", async (req, res) => {
  const oID = req.query._id;
  console.log("oID:", oID);

  if (!oID) {
    return res.status(400).send({ message: "Missing organization ID" });
  }

  try {
    const organization = await OrganizationUser.findById(oID);
    if (!organization) {
      console.log("Organizația nu a fost găsită pentru oID:", oID);
      return res.status(404).send({ message: "Organizația nu a fost găsită" });
    }
    res.send(organization);
  } catch (error) {
    console.error('Eroare la accesarea datelor organizației:', error.message);
    res.status(500).send({ message: "Eroare la accesarea datelor organizației", error: error.message });
  }
});

router.get("/organizations", async (req, res) => {
  try {
    const organizations = await OrganizationUser.find({});
    res.status(200).send({ data: organizations });
  } catch (error) {
    console.error('Error fetching organizations:', error.message);
    res.status(500).send({ message: "Error fetching organizations", error: error.message });
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    const organizations = await OrganizationUser.find({});
    res.status(200).send({ users, organizations });
  } catch (error) {
    console.error('Error fetching users and organizations:', error.message);
    res.status(500).send({ message: "Error fetching users and organizations", error: error.message });
  }
});

router.get("/userProjects/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const organization = await OrganizationUser.findById(userId);
      if (!organization) {
        return res.status(404).send({ message: "User or organization not found" });
      }
      const projects = await Project.find({ _id: { $in: organization.personalProjects } });
      return res.status(200).send({ projects });
    }
    const projects = await Project.find({ _id: { $in: user.personalProjects } });
    res.status(200).send({ projects });
  } catch (error) {
    console.error('Error fetching user projects:', error.message);
    res.status(500).send({ message: "Error fetching user projects", error: error.message });
  }
});

router.post("/getProjectsForUsers", async (req, res) => {
  const { userIds } = req.body;
  console.log("Received userIds:", userIds); // Log pentru userIds
  try {
    const projectsByUser = {};

    for (const userId of userIds) {
      const projects = await Project.find({ applicants: userId });
      console.log(`Projects for user ${userId}:`, projects); // Log pentru proiecte
      projectsByUser[userId] = projects;
    }

    console.log("Final projectsByUser:", projectsByUser); // Log pentru toate proiectele preluate
    res.status(200).send({ projectsByUser });
  } catch (error) {
    console.error('Error fetching projects for users:', error.message);
    res.status(500).send({ message: "Error fetching projects for users", error: error.message });
  }
});

module.exports = router;
