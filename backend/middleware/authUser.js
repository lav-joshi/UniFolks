const jwt = require("jsonwebtoken");

const authUser = async (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).send({message: "Unauthorized: No token provided"});
    } else {
        jwt.verify(token, process.env.jwtSecret, function (err, decoded) {
        if (err) {
            res.status(401).send({message: "Unauthorized: Invalid token"});
        } else {
            req._id = decoded._id;
            next();
        }
        });
    }
};


module.exports = authUser;