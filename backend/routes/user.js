const express = require("express");
const router = express.Router();
const User = require('../models/User');
const authUser = require('../middleware/authUser')

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

router.get("/hello",authUser, (req,res)=>{
    console.log("Nacho bacho");
    res.status(200).send({message:"Amazing"});
})

// This returns the user information .
// Params: key can be id or email and value should be corresponding to that in body.

router.get("/getProfile/:key", (req, res)=> {
    let key = req.params['key'];
    User.findOne({key : req.body.value},async (err, user)=>{
        if(err) {
            res.status(400).send({message : "Something went wrong"});
        }
        res.status(200).send(user);
    });
});

module.exports = router;

