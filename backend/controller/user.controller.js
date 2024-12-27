const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const dotenv = require('dotenv')
dotenv.config();


const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ msg: "Please provide all fields" });
    }

    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Please provide a valid email address." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please provide email and password" });
    }

  
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Please provide a valid email address." });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7h" });
   
    res.json({"msg":"user succesfully loggedin", token });
}

module.exports = { registerUser, loginUser };
