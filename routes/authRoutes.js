const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash });
    res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
        return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

module.exports = router;