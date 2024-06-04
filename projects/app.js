const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { type } = require("os");
const schema = mongoose.Schema;
const path = require("path");
const port = 8080;




const userSchema = new schema({
    name : {
        type :String
        
    },
    email : {
        type : String,
        required: true
    },
    subject : {
        type :String
    }

});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/aietm');
console.log("connection successfull")
};
main();
  

const User = mongoose.model("User", userSchema)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));

app.listen(port, ()=>{
    console.log("port is listening")
});

app.get("/", (req,res)=>{
    res.render("front.ejs")
});

app.get("/explore", (req,res)=>{
    res.render("contact.ejs")
});

app.post("/query", async (req,res)=>{
    let {name,email,subject} = req.body;
   const user = new User({
    name: name,    
    email : email,
    subject : subject
    });
    user.save().then((res)=>{
        console.log("email saved")
    }).catch(err =>{
        console.log(err);
    });
    res.render("contact.ejs",{email})
    console.log (user);
});

app.get("/card", (req,res)=>{
    res.render("card.ejs")
});


app.get("/events", (req,res)=>{
    res.render("landingpage.ejs")
});
  
app.get("/campuss", (req,res)=>{
    res.render("campus.ejs")
});
  
app.get("/facility", (req,res)=>{
    res.render("facility.ejs")
});
  
    