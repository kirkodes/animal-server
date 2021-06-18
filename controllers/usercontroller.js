const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password, 13)
        });
        let token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            message: "User successfully created.",
            user: newUser,
            sessionToken: token
        });
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.post("/login", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const loggedInUser = await User.findOne({
            where: {
                username: username,
            }
        })
        console.log("The USER", User);
        if (loggedInUser) {
            let passwordComparison = await bcrypt.compare(password, loggedInUser.password);

            if (passwordComparison) {
                let token = jwt.sign({id: loggedInUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
                message: "User successfully logged in.",
                user: loggedInUser,
                sessionToken: token
            });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Login failed; incorrect email or password."
            })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;