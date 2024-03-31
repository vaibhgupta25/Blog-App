const { verify } = require('jsonwebtoken')
const User = require('../models/User')
 
const authGuard = async (req, res, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            console.log('AuthGuard')
            const token = req.headers.authorization.split(" ")[1]
            const { id } = verify(token, process.env.JWT_SECRET_KEY)
            req.user= await User.findById(id).select("-password")
            if(req.user===null)
            {
                let error = new Error("User not found")
                error.statusCode = 404
                throw error
            }
            // console.log(req.user)
            next()
        } catch (error) {
            next(error)
        }
    }
    else {
        let error = new Error("Not authorized, No Token")
        error.statusCode=401
        next(error)
    }
}

const authAdmin = (req,res,next) =>{
    if(req.user && req.user.admin){
        console.log('authAdmin')
        next()
    }
    else {
        const err = new Error("Not authorized as an admin");
        next(err);
    }
}

module.exports = {authGuard, authAdmin}; 