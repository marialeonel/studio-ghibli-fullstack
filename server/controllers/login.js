require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {logger} = require('../services/logger.js');

const User = require('../models/User.js')


//login
router.post("/login", async (req, res) => {
    const {email, password } = req.body

    if(!email) {
        return res.status(422).json({ msg: 'email is required!'})
    }
    if(!password) {
        return res.status(422).json({ msg: 'password is required!'})
    }

    const user = await User.findOne({email: email})

    if(!user) {
        return res.status(404).json({msg: 'User not found!'})
    }

    const check_password = await bcrypt.compare(password, user.password);

    if(!check_password) {
        return res.status(422).json({msg: 'Invalid password!'})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            { expiresIn: '15m' } 
        )

        res.status(200).json({msg: 'Authentication successfully completed!', token: token})
    } catch(error) {
        console.log(error)
        logger.error(`Falha de login para o usuário ${user} do IP ${req.ip}`);
        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        })
    }
})

module.exports = router;
