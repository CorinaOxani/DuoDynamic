// Fișier: routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

router.post("/addProject", async (req, res) => {
  const { projectName, description, organizer, email, mobile, organization, country, address, startDate } = req.body;
  try {
    const oldProj = await Project.findOne({ projectName });
    if (oldProj) {
      return res.send({ data: "A project with this name already exists!" });
    }
    await Project.create({ projectName, description, organizer, email, mobile, organization, country, address, startDate });
    res.send({ status: "ok", data: "Project added successfully" });
  } catch (error) {
    res.send({ status: "error", data: "Error!" });
  }
});

module.exports = router;
