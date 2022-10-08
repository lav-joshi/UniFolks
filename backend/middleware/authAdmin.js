const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authAdmin = async (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1]
    const email = req.headers.email
    if (!token) {
        res.status(401).send({message: "Unauthorized: No token provided"});
    } else {
        jwt.verify(token, process.env.jwtSecret, function (err, decoded) {
        if (err) {
            res.status(401).send({message: "Unauthorized: Invalid token"});
        } else {
            if(!email) {
                res.status(401).send({message: "Unauthorized: No email provided"});
            }else{
                User.findOne({email}, (dbErr, user)=>{
                    if(dbErr) res.status(401).send({message: "Not found"});

                    if(user.isAdmin == false){
                        res.status(401).send({message: "Unauthorized: No rights as administrator"});
                    }else{
                        req._id = decoded._id;
                        next();
                    }
                })
            }
        }
        });
    }
};


module.exports = authAdmin;