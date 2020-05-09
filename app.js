//jshint esversion:6
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const passport = require ("passport");






app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = {
  email: String,
  password: String
}


const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res) {
  res.render("home");
})


app.get("/login", function(req, res) {
  res.render("login");
})


app.get("/register", function(req, res) {
  res.render("register");
})

app.post("/register", function(req, res) {
  
});


app.post("/login", function(req, res) {
});




app.listen(3000, function() {
  console.log("Server started on port 3000")
});
