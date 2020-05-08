//jshint esversion:6
require("dotenv").config();

const express = require ("express");
const bodyParser = require ("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require ("mongoose");
const md5 = require("md5");


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended:true
}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true, useUnifiedTopology:true});

const userSchema ={
  email: String,
  password: String
}


const User = new mongoose.model("User", userSchema);

app.get("/",function(req,res){
  res.render("home");
})


app.get("/login",function(req,res){
  res.render("login");
})


app.get("/register",function(req,res){
  res.render("register");
})

app.post("/register",function(req, res){
  const userEmail = req.body.username;
  const userPassword = req.body.password;

  const newUser = new User({
    email:userEmail,
    password: md5(userPassword)
  })
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets")
    }
  });
})

app.post("/login", function(req,res){
  const userEmail = req.body.username;
  const userPassword = md5(req.body.password);
  console.log(userPassword);
  console.log(userEmail);
  User.findOne({email:userEmail},function(err,result){
    if(!result){
      console.log("No Username");
    }else{
      if (result.password===userPassword){
        res.render("secrets");
      }else{
      console.log("Wrong Password");
    }}
  })
});


app.listen(3000, function(){
  console.log("Server started on port 3000")
});
