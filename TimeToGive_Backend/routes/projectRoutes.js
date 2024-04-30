// Fișier: routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');
const UserInfo = require('../models/User');
const router = express.Router();

router.post("/addProject", async (req, res) => {
  const { projectName, spots, applicants, availableSpots, description, organizer, email, mobile, organization, country, address, startDate, image } = req.body;
  try {
    const oldProj = await Project.findOne({ projectName });
    if (oldProj) {
      return res.send({ data: "A project with this name already exists!" });
    }
    await Project.create({ projectName, spots, applicants, availableSpots, description, organizer, email, mobile, organization, country, address, startDate, image });
    res.send({ status: "ok", data: "Project added successfully" });
  } catch (error) {
    res.send({ status: "error", data: "Error!" });
  }
});

// Endpoint pentru a prelua toate proiectele
router.get("/getProjects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.send({ status: "ok", data: projects });
  } catch (error) {
    res.status(500).send({ status: "error", data: "Error retrieving projects!" });
  }
});

router.post('/apply/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const userId = req.body.userId;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const user = await UserInfo.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verifică dacă utilizatorul a aplicat deja la proiect
    const alreadyApplied = project.applicants.includes(userId);
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: 'You have already applied to this project' });
    }

    // Acum că verificările de existență și duplicate sunt complete, procedăm cu aplicarea
    if (project.availableSpots > 0) {
      project.availableSpots--;
      project.applicants.push(userId);
      await project.save();

      user.personalProjects.push({ projectId: project._id, projectName: project.projectName });
      await user.save();

      res.status(200).json({ success: true, message: 'You have successfully applied to the project.' });
    } else {
      res.status(400).json({ success: false, message: 'No available spots left for this project.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while applying to the project.', error: error.message });
  }
});



router.post('/update-project', async(req, res)=>{
const{
  projectName,
  spots,
  description,
  organizer,
  email,
  mobile,
  organization,
  country,
  address,
  startDate,
  image
}=req.body;

try{
await Project.updateOne({projectName:projectName},{
$set:{
     spots,
     description,
     organizer,
     email,
     mobile,
     organization,
     country,
     address,
     startDate,
     image
}
});
res.send({status:"ok", data:"Updated"})
}catch(error)
{
    return res.send({error:error});
}
})

module.exports = router;
