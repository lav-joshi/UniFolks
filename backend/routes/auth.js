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

        const {email_verified , name, email, hd, picture } = response.payload;
       
        if(email_verified){

            if(hd  === "iiitl.ac.in"){
                User.findOne({email},(err,user)=>{
                    if(err){
                        return res.status(400).json({
                            error: "Something went wrong"
                        })
                    }else{
                        if(user){
                            const token = jwt.sign({_id: user._id} , process.env.jwtSecret ,{expiresIn :'7d'});
                            
                            const {_id , name , email, picture } =  user;
                            res.json({
                                token ,
                                user : {_id , name , email, picture }
                            })
                        }else{
                            let newUser = new User({name , email, picture });
                            const token = jwt.sign({_id: newUser._id} , process.env.jwtSecret ,{expiresIn :'7d'});
                            
                            newUser.save((err,data)=>{
                                if(err){
                                    return res.status(400).json({
                                        error: "Something went wrong"
                                    })
                                }else{
                                    const {_id , name , email, picture } =  newUser;
                                    res.json({
                                        token,
                                        user : {_id , name , email, picture }
                                    })
                                }
                            })
                        }
                    }
                });
            }else{
                return res.status(400).json({
                    error: "Only allowed from IIITL accounts"
                })
            }
        }else {
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
    })
});

module.exports = router;
