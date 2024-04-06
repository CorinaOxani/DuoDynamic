require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

// Utilizați variabila de mediu pentru URI-ul MongoDB
const mongoUrl = process.env.DB_URI;

mongoose
    .connect(mongoUrl)
    .then(() => console.log("Database Connected"))
    .catch((e) => console.error("Failed to connect to database:", e));

require('./UserDetails');
const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
    res.send({status: "Started"});
});

app.post('/register', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            // 409 Conflict
            return res.status(409).send({ message: "User already exists!" });
        }

        const user = await User.create({
            name,
            email,
            mobile,
            password,
        });

        // 201 Created
        res.status(201).send({ message: "User created successfully", user });
    } catch (error) {
        // 500 Internal Server Error
        res.status(500).send({ message: "Error creating the user", error: error.message });
    }
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email: email });

        if (!oldUser) {
            return res.status(404).send({ data: "User doesn't exist" });
        }

        if (oldUser.password !== password) {
            return res.status(401).send({ data: "Invalid credentials" });
        }
        res.send({ data: "Login successful" });

    } catch (error) {
        res.status(500).send({ data: "An error occurred during the login process" });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
