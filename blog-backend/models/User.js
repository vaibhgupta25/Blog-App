const mongoose = require('mongoose')
const { hash, compare } = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        required: false,
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


UserSchema.pre('save', async function (next) {

    //hashing password for the security
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10)
    }

    return next();
})

UserSchema.methods.comparePassword = async function (enteredPassword) {
    // console.log(this.password)
    return await compare(enteredPassword, this.password)
}

UserSchema.methods.generateToken = async function () {
    return await jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '30d' }
    )
}

const User = mongoose.model("User", UserSchema);
module.exports = User;