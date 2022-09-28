const express = require("express");
const router = express.Router();
const User = require('../models/User');


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

router.get("/create", (req,res)=>{
    User.create({name: "VKS" , email :"vks@iiitl.ac.in"}, (err,user)=>{
        res.send("Done");
    })
})

module.exports = router;

