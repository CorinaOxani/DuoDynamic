// Fișier: routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

router.post("/addProject", async (req, res) => {
  const { projectName, spots, description, organizer, email, mobile, organization, country, address, startDate, image } = req.body;
  try {
    const oldProj = await Project.findOne({ projectName });
    if (oldProj) {
      return res.send({ data: "A project with this name already exists!" });
    }
    await Project.create({ projectName, spots, description, organizer, email, mobile, organization, country, address, startDate, image });
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

// Endpoint-ul pentru a aplica la un proiect
router.post('/applyToProject', async (req, res) => {
  const { projectId, userId } = req.body;

  try {
    // Actualizarea proiectului pentru a scădea numărul de locuri disponibile
    const project = await Project.findByIdAndUpdate(projectId, { $inc: { spotsAvailable: -1 } }, { new: true });

    // Adăugarea proiectului la lista de proiecte ale utilizatorului
    const user = await User.findByIdAndUpdate(userId, { $push: { projectsApplied: projectId } }, { new: true });

    // Trimiterea unui răspuns de succes
    res.status(200).json({ message: 'Applied to project successfully', project, user });
  } catch (error) {
    // Tratarea cazului de eroare
    res.status(500).json({ message: 'Error applying to project', error });
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
