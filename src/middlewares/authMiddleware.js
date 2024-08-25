const jwt = require("jsonwebtoken");
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

const isLogIn = (req,res,next)=>{
    try {
        let token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({
                status:"fail",
                msg : "Unauthorized user"
            });
        }
        let decode = jwt.verify(token,accessTokenKey);
        req.user = decode.user;
        if(!decode){
            return res.status(401).json({
                status:"fail",
                msg : "Invalid token please login"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            msg : error.toString()
        });
    }
};

const isLogOut = (req,res,next)=>{
    try {
        let accessToken = req.cookies.accessToken;
        if(accessToken){
            let decode = jwt.verify(accessToken,accessTokenKey);
            if(decode){
                return res.status(409).json({
                    status:"fail",
                    msg : "You have already login"
                })
            }else {
                return res.status(401).json({
                    status:"fail",
                    msg : "User token expired"
                });
            }
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString()
        });
    }
};

const isAdmin = (req,res,next)=>{
    try {
        let admin = req.user.isAdmin
    } catch (error) {
        
    }
};


module.exports = {isLogIn,isLogOut}