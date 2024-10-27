const User = require('../models/user.modal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            username,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        let user = await User.findOne({ email })
        
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        
        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            email: user.email,
            username:user.username,
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${user.username}`,
            user: user,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

const updateProfile = async (req, res) => {
    try {
        const { username } = req.body;
        const userId = req.id;
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        if (username) user.username = username;

        await user.save();

        user = {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
        }

        return res.status(200).json({
            message: "Profile Updated successfully",
            user: user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    register,
    login,
    logout,
    updateProfile
}