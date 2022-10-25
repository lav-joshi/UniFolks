const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin');
const moment = require("moment");

// Add user the org chart
router.get("/addUser" , (req,res)=>{
    // parent
    // children
    let parentId = 'lav@gmail.com';
    let currentUser = 'vks@iiitl.ac.in';
    let childId = "Kush@gmail.com";

    User.findOne({email : parentId}, async (err,parentUser)=>{
        // Delete from parentChildId;
        // Add childId to the currentUser;
        let index = parentUser.children.indexOf(childId);
        if(index > -1){
            parentUser.children.splice(index,1);
            parentUser.children.push(currentUser);
            await parentUser.save();
        }
        User.findOne({email : currentUser}, async (err, user) =>{
            user.children.push(childId)
            await user.save();
            res.send("Updated the tree");
        })
    })
})

// Creates the profile to the user that will the part of org.
router.get("/create", (req,res)=>{
    
})

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
