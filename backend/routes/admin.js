const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const Edge = require('../models/Edge')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin');
const moment = require("moment");

router.post("/addbetween" , async (req,res) => {
    console.log("Hello")
    let parentId = req.body.parentId;
    let childId  = req.body.childId;
    let newChildId = req.body.newChildId;

    await Edge.deleteOne({src : parentId, dest : childId});
    await Edge.create({src : parentId, dest : newChildId});
    await Edge.create({src : newChildId , dest: childId});

    res.status(200).json({
        message: "Successfully added the person in org"
    })
})

// Add leaf node
router.post("/addleaf" , (req,res) => {
    let parentId = req.body.parentId;
    let childId  = req.body.childId;
    Edge.create({src : parentId , dest: childId}, (err, edge)=>{
        if(err){
            res.status(400).send({message : "Something went wrong"});
        }else{
            res.status(200).json({
                message: "Successfully added the person in org"
            })
        }
    })
});

// Creates the profile to the user that will the part of org.
router.post("/create", async (req,res)=>{

   let user = await User.findOne({email : req.body.email})

   if(user){
        res.status(200).json({message : "User with this emailId already exists"});
   }else{
        User.create({name : req.body.name , email : req.body.email, designation : req.body.designation}, (err , newUser) => {
            if(err) {
                res.status(200).json({message : "Something went wrong"});
            }else{
                res.status(200).json({message : `User with mail id ${newUser.email} created`});
            }
        });
    }
});

// Deletes the particular user
router.post("/removeUser", async (req,res) => { 
   let user = await User.deleteOne({email : req.body.email})
   res.status(200).json({message : `User with mail id ${req.body.email} deleted`});
});

// Adds the tags to the user 
// : Not tested yet
router.get("/addtags" , (req,res) => {
    User.findOne({ email : req.body.userId},async(err,user)=>{
        if(err) {
            res.status(400).send({message : "Something went wrong"});
        }else{
            req.body.tags.split(",").forEach((tag)=>{
                user.tags.push(tag);
            })
            await user.save(); 
            res.status(200).json({
                message: "Successfully added tags to the profile"
            })
        }
    })
});


module.exports = router;
