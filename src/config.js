const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/login-covid");

//check database connected or no
connect.then(() => {
    console.log("Database connected Successfully")
})
.catch(() =>{
    console.log("Database cannot be connected")
});
//create a Model(schema)
const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

//collection Part
const collection = new mongoose.model("users", LoginSchema);
//very important
module.exports = collection;