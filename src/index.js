const express = require('express');
const pasth = require("path");
const bcrypt = require("bcrypt");
//import Model from config.js 
const collection = require ("./config");

const app = express();

//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// use EJS as the viw engine
app.set('view engine' , 'ejs');
//static file
app.use(express.static("public"))

app.get("/", (req, res) =>{
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup")
})

//Register User
app.post("/signup", async(req, res) => {
    //username: reffers to name="username" in signup.ejs
    const data = {
        name: req.body.username,
        password: req.body.password,
    }
    //check if user already exists
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different username.");
    }
    else{
        // hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; //Replace the hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

}); 

//Login user
app.post("/login", async(req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }
        //compare the hash password frm the database with the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, chech.password);
        if(isPasswordMatch){
            req.send("wrong password");
        }else {
            req.send("worng password");
        }
    }catch{
        res.send("wrong Details");
    }
})

const port = 8000;
app.listen(port, () => {
    console.log('Server running on Port : ${port}')
})
