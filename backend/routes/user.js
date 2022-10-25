const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin');
const moment = require("moment");

// Get all users of the institute
router.get("/allusers", authUser, (req,res) => {
    User.find({} , (err, users)=>{
        if(err) {
            res.status(400).send({message : "Something went wrong"});
        }else{
            res.status(200).json({
                users
            })
        }
    })
})

// Returns the user information .
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

// Adds the person as friend 
router.get("/addFriend/" , (req,res)=>{
    User.findOne({email : req.headers.email} , async (err1, user) => {
        if(err1 || !user){
            res.status(400).send({message : "Something went wrong"});
        }else{
            User.findOne({email : req.body.friendId} , async (err2 , friend) => {
                if(err2 || !friend){
                    res.status(400).send({message : "Something went wrong"});
                }else{
                    user.friends.push(req.body.friendId);
                    friend.friends.push(req.headers.email)
                    await user.save();
                    await friend.save()
                    res.status(200).json({ 
                        message : "Successfully added as friend"
                    })
                }
            })
        }
    })
})

// returns the friends of the user
router.get("/getFriends" , authUser, (req,res)=> {
    User.findOne({email: req.headers.email} , async (err, user)=>{
        if(err || !user){
            res.status(400).send({message : "Something went wrong"});
        }else{
            let friends = [];

            for(let i = 0 ; i < user.friends.length; i++){
                let friend = await User.findOne({email : user.friends[i]});
                friends.push({
                    email : user.friends[i],
                    picture : friend?.picture,
                    name : friend?.name
                })
            }

            res.status(200).json({
                friends: friends
            })
        }
    })
})

// Sorted chats according to time, 
router.post("/getMessages", authUser, (req,res)=> {
    let email1 = req.body.userId;
    let email2 = req.body.friendId;
    Chat.find({sender: email1 , receiver: email2}, async (err1, chats1)=>{
        Chat.find({sender: email2, receiver: email1},async (err2, chats2)=>{
            let chats = [...chats1, ...chats2];
            const sortedChats = chats.sort(
                (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt),
            );
            res.status(200).json({
                messages: sortedChats
            })
        })
    })
});

module.exports = router;

