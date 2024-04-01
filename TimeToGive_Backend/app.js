const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const mongoUrl = 
"mongodb+srv://oxanicorina0:Negru123@cluster0.ofrsvwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Database Connected" );
    })
    .catch((e) => {
        console.log(e);
    });
require('./UserDetails')
const User = mongoose.model("UserInfo");

app.get("/" ,(req, res) =>{
    res.send({status:"Started"});
});

app.post('/register',async(req, res)=>{
    const {name, email, mobile, password} = req.body;

    const oldUser= await User.findOne({email: email}); //incearca sa caute un utilizator cu acelasi email
    if(oldUser){
        return res.send({data: "User already exist! "});
    }

    try{
        await User.create({
            name: name,
            email: email,
            mobile,
            password,

        });
        res.send({status: "ok", data: "User Created"});
    } catch(error){
        res.send({status: "error", data: "error"});
    }
});

app.listen(5001,()=>{
    console.log("Node js server started.");

});