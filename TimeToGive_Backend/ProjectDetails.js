const mongoose = require("mongoose");
const ProjectDetailsSchema = new mongoose.Schema(
  {
    projectName: { type: String, unique: true },
    description: String,
    organizer: String,
    email: String,
    mobile: String,
    organization: String,
    country: String,
    adress: String,
    startDate: Data,
  },
  {
    collection: "ProjectInfo",
  }
);
mongoose.model("ProjectInfo", ProjectDetailsSchema);
