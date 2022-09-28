const express = require("express");
const router = express.Router();
const {OAuth2Client} = require("google-auth-library");
const User = require('../models/User');
const jwt = require("jsonwebtoken");


const client = new OAuth2Client(process.env.clientId);

router.post("/google/signin",async(req,res)=>{
    const {tokenId} = req.body;
    
    client.verifyIdToken({
        idToken : tokenId  ,
        audience : process.env.clientId
    }).then((response)=>{

        const {email_verified , name, email } = response.payload;
        if(email_verified){
            User.findOne({email},(err,user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Something went wrong"
                    })
                }else{
                    if(user){
                        const token = jwt.sign({_id: user._id} , process.env.jwtSecret ,{expiresIn :'7d'});
                        
                        const {_id , name , email } =  user;
                        res.json({
                            token ,
                            user : {_id , name , email }
                        })
                    }else{
                        let newUser = new User({name , email });
                        const token = jwt.sign({_id: newUser._id} , process.env.jwtSecret ,{expiresIn :'7d'});
                        
                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({
                                    error: "Something went wrong"
                                })
                            }else{
                                const {_id , name , email } =  newUser;
                                res.json({
                                    token,
                                    user : {_id , name , email }
                                })
                            }
                        })
                    }
                }
            });
        }
    })
});

module.exports = router;
