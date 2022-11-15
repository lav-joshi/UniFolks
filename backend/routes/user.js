const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Edge = require('../models/Edge')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin');
const moment = require("moment");
const {cloudinary} = require("../utils/cloudinary");


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
router.post("/getProfile/:key", (req, res)=> {
    let key = req.params['key'];
    User.findOne({[key] : req.body.value},async (err, user)=>{
        if(err) {
            res.status(400).send({message : "Something went wrong"});
        }else{
            console.log(user);
            res.status(200).send(user);
        }
    });
});

// Adds the person as friend 
router.post("/addFriend/" , (req,res)=>{
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

// Private function to check emailId in initialNodes
const checkUserAvailability = (initialNodes, emailId) => {

    for(let i = 0; i < initialNodes.length; i++){
        if(initialNodes[i].data.email === emailId) return false;
    }
    return true;
}

// Returns the tree stucture
router.get("/getTree" , async (req, res) => {
    let edges = await Edge.find({});

    let initialEdges  = [];
    let initialNodes = [];

    initialNodes.push({
        id: "bog",
        position : { x: 0, y: 0 },
        type: "bogButton",
        data: {
            picture: "",
            name: "",
            designation: "",
            email: "",
        },
    })
    
    initialEdges.push({id : "bog-edge", source : "bog" , target : "fcomm" , type: "buttonEdge", style: { stroke: '#023047' }})

    initialNodes.push({
        id: "fcomm",
        position : { x: 0, y: 0 },
        type: "financeComm",
        data: {
            picture: "",
            name: "",
            designation: "",
            email: "",
        },
    })
    
    initialEdges.push({id : "fcomm-edge", source : "fcomm" , target : "director@iiitl.ac.in" , type: "buttonEdge", style: { stroke: '#023047' }})

    
    for(let i = 0 ; i < edges.length; i = i + 1){
        let src = edges[i].src;
        let dest = edges[i].dest;

        let srcUser = await User.findOne({email : src});
        let destUser = await User.findOne({email : dest});
        
        if(srcUser && checkUserAvailability(initialNodes, src)){
            initialNodes.push({
                id: src,
                position : { x: 0, y: 0 },
                type: "customNode",
                data: {
                    picture: srcUser.picture,
                    name: srcUser.name,
                    designation: srcUser.designation,
                    email: srcUser.email,
                },
            })
        }

        if(destUser && checkUserAvailability(initialNodes, dest)){
            initialNodes.push({
                id: dest,
                position : { x: 0, y: 0 },
                type: "customNode",
                data: {
                    name: destUser.name,
                    designation: destUser.designation,
                    bio: destUser.bio,
                    email: destUser.email,
                    picture: destUser.picture,
                    contact: destUser.contact,
                    urls: destUser.urls,
                    tags: destUser.tags,
                },
            })
        }
        initialEdges.push({id : edges[i].id, source : src , target : dest , type: "buttonedge", style: { stroke: '#023047' }})
    }   

    res.status(200).json({
        initialNodes,
        initialEdges 
    })
})

router.post("/changePicture" , async (req , res ) => {

    const x = JSON.parse(req.body.data);
    const fileStr = x.data;

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'ml_default',
    });

    User.findOne({email : req.body.email}, async (err , user)=> {
        if(err){
            res.status(400).send({message : "Something went wrong"});
        }else{
            user.picture = uploadResponse.secure_url;
            await user.save();
            res.status(200).send({imageURL: uploadResponse.secure_url , message : "Photo changed successfully"});
        }
    });
});

router.post("/editProfile" , async (req, res) => {
    let doc = await User.findOneAndUpdate({email : req.body.email}, req.body);
    res.status(200).json({
        message : "Profile updated"
    })
});

module.exports = router;

