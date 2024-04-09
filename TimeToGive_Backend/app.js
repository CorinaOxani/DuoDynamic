const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { port } = require('./config/config');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use(userRoutes);
app.use(projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
