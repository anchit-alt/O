const express = require("express");
const Bodyparser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/oxonDB");
const SignupSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  email:String
});
const Information = mongoose.model("Information",SignupSchema);

const Info1 = new Information ({
  firstname:"client1",
  lastname:"clent1-lastname",
  email:"client email"
});
const Info2 = new Information ({
  firstname:"client2",
  lastname:"clent2-lastname",
  email:"client2 email"
});

const array = [Info1,Info2];
Information.insertMany(array,function(err){
  if (err){
    console.log(err);

  }else{
    console.log("success");
  };

});


app.use(Bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})






app.post("/",function(req,res){
  res.send("thanks for signing up");
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  console.log(firstname);
  console.log(lastname);
  console.log(email);
});


app.listen(3000,function(req,res){
  console.log("server is on");
})
