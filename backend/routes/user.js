const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin');

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

router.get("/hello", authUser, (req,res)=>{
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
        }else{
            res.status(200).send(user);
        }
    });
});

// returns the friends of the user
router.get("/getFriends" , authUser, (req,res)=> {
    User.findOne({email: req.headers.email} , (err, user)=>{
        if(err || !user){
            res.status(400).send({message : "Something went wrong"});
        }else{
            res.status(200).json({
                // ToDo populate here name also
                friends: user.friends
            })
        }
    })
})

router.post("/getMessages", authUser, (req,res)=> {
    let email1 = req.body.userId;
    let email2 = req.body.friendId;
    Chat.find({sender: email1 , receiver: email2}, async (err1, chats1)=>{
        Chat.find({sender: email2, receiver: email1},async (err2, chats2)=>{
            let chats = [...chats1, ...chats2];
            res.status(200).json({
                messages: chats
            })
        })
    })
})

module.exports = router;

