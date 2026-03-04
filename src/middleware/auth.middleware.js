const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");


async function isUserLoggedIn(req,res,next) {

    try {
        const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Login First"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)
    req.user = user;

    next()
    } catch (error) {

        return res.status(401).json({message: "Invalid token"})
    }


}





module.exports = {isUserLoggedIn }