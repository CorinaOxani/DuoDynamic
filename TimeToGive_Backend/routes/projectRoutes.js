// Fișier: routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

router.post("/addProject", async (req, res) => {
  const { projectName, description, organizer, email, mobile, organization, country, address, startDate, image } = req.body;
  try {
    const oldProj = await Project.findOne({ projectName });
    if (oldProj) {
      return res.send({ data: "A project with this name already exists!" });
    }
    await Project.create({ projectName, description, organizer, email, mobile, organization, country, address, startDate, image });
    res.send({ status: "ok", data: "Project added successfully" });
  } catch (error) {
    res.send({ status: "error", data: "Error!" });
  }
});

router.post('/update-project', async(req, res)=>{
const{
  projectName,
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
