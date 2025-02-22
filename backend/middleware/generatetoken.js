const jwt = require("jsonwebtoken");

const generatetoken = (id) =>{
    return jwt.sign({id: user._id}, process.env.TOKEN, {expiresIn: "14d"});
}


module.exports = generatetoken;