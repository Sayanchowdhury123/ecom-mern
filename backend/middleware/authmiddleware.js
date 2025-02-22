const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req,res,next) => {
    let token = req.header("Authorization");

    if(token && token.startsWith("Bearer")){
        try {
            token = token.split(" ")[1];
            const decode = jwt.verify(token,process.env.TOKEN);
            req.user = await User.findById(decode.id).select("-password");
            next();
        } catch (error) {
              res.status(401).json({message: "not authorized, token failed"})  ;
        }
    } else{
          res.status(401).json({message: "no token"})  ;
    }
} 


const isadmin = (req,res,next) => {
    if(req.user && req.user.isadmin){
        next();

    }else{

        res.status(401).json({message: "access denied , admin only"})  ;
    }
}


module.exports = {protect, isadmin}