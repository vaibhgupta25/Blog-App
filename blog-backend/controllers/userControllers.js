const User = require('../models/User')
const uploadPicture = require('../middlewares/uploadPictureMiddleware')
const fileRemover = require('../utils/fileRemover')
  
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //check whether the user exist
        let user = await User.findOne({ email });

        if (user) {
            throw new Error("User Already Exists")
        }

        user = await User.create({
            name,
            email,
            password
        })

        return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateToken(),
        })
    } catch (error) {
        next(error)
        // pass error object to next function for the triggering of middleware
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        let user = await User.findOne({ email });

        console.log("line41"+user)
        if (!user) {
            throw new Error("Invalid Username or password")
        }

        const match = await user.comparePassword(password)

        // console.log(match)
        if (!match) {
            throw new Error("Invalid username or password")
        }
        else {
            return res.status(200).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
                token: await user.generateToken(),
            })
        }
    } catch (error) {
        next(error);
    }
}

const userProfile = async (req, res, next) => {
    try {
        const id = req.user._id
        console.log(id)
        const user = await User.findById(id).select("-password -createdAt -__v -updatedAt");

        if (!user) {
            let error = new Error("User not found")
            error.statusCode = 404
            next(error)
        }
        // console.log('user'+ user)
        return res.status(201).json(user)
    } catch (error) {
        next(error)
    }

}

const updateProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id)

        if (!user) {
            throw new Error("User not found")
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password && req.body.password.length < 8) {
            console.log("hwl")
            throw new Error("Lenth of the password must be of 8 characters")
        }
        else if (req.body.password) {
            user.password = req.body.password
        }

        const updatedProfile = await user.save();

        return res.status(200).json({
            _id: updatedProfile._id,
            avatar: updatedProfile.avatar,
            name: updatedProfile.name,
            email: updatedProfile.email,
            verified: updatedProfile.verified,
            admin: updatedProfile.admin,
            token: await updatedProfile.generateToken(),
        })
    }
    catch (error) {
        next(error)
    }
}

const updateProfilePicture = async (req, res, next) => {
    try {
        const upload = uploadPicture.single("profilePicture")

        upload(req, res, async function (err) {
            if (err) {
                console.log(err.message)
                const error = new Error("An unknown occured when uploading")
                next(error)
            } else {

                let updatedUser;

                let filename;
                updatedUser = await User.findById(req.user._id);
                filename = updatedUser.avatar;

                if (req.file) {
                    updatedUser.avatar = req.file.filename
                }
                else {
                    updatedUser.avatar = ""
                }

                await updatedUser.save()

                if (filename) fileRemover(filename)

                return res.json({
                    _id: updatedUser._id,
                    avatar: updatedUser.avatar,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    verified: updatedUser.verified,
                    admin: updatedUser.admin,
                    token: await updatedUser.generateToken(),
                })
            }
        })
    } catch (error) {
        next(error)
    }

}
module.exports = { registerUser, loginUser, userProfile, updateProfile, updateProfilePicture }