const express = require("express");
const bcrypts = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {protect} = require("../middleware/authmiddleware");
const generatetoken = require("../middleware/generatetoken")



const router = express.Router();





router.post("/register", async(req,res) => {
    try{
     const {name,email,password} = req.body;
     console.log({name,email,password});
     const userexists = await User.findOne({email});

     if(userexists){
      return  res.status(400).json({message: "user already exists"})  
     }
    const salt = await bcrypts.genSalt(10)
     const hashedpassword = await bcrypts.hash(password,salt);

     const newuser = new User({
        name,
        email,
        password: hashedpassword,
     });
 
     await newuser.save();

  res.status(201).json({message: "user registered successfully"})
    }catch(error){
        res.status(500).json({message: "registration error", error})
    }
});


router.post("/login", async(req,res) => {
    try{

const {email,password} = req.body;
console.log({email,password});

const user = await User.findOne({email});
console.log(user);
if(!user){
    return  res.status(400).json({message: "invalid crediatials"})  ;
}

const ismatch = bcrypts.compare(password,user.password);
if(!ismatch){
    return  res.status(400).json({message: "invalid crediatials"})  ;
}

const token = jwt.sign({id: user._id}, "realme8", {expiresIn: "14d"});

   console.log("user athenticated", {user,token});

   res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token
   });

    }catch(error){
        res.status(500).json({message: "server error"})
    }
})


router.get("/user",protect,async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
})

module.exports = router;