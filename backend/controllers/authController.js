const User = require("../models/user");
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
// Register Endpoint
const registerUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        //check if email was enetered
        if(!email) {
            return res.json({
                error: 'Email is requied'
            })
        };
        //check if password is good
        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast 6 characters long'
            })
        };
        // check email
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email already Exists',
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            email,
            password: hashedPassword,
        })
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}
// Login Endpoint
const loginUser = async (req, res)  => {
    try {
        const { email, password } = req.body;
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: "No user Found"
            })
        }
        // check if passwords match
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match){
            res.json({
                error: "Passwords do not match"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    registerUser,
    loginUser
};