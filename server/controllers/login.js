require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User.js')
const {checkToken} = require('../middleware/authentication.js')

//register user
router.post('/register', async (req, res) => {
    const {name, email, password, confirm_password } = req.body

    if(!name) {
        return res.status(422).json({ msg: 'Name is required!'})
    }

    if(!email) {
        return res.status(422).json({ msg: 'email is required!'})
    }
    if(!password) {
        return res.status(422).json({ msg: 'password is required!'})
    }
    if(password !== confirm_password) {
        return res.status(422).json({ msg: 'passwords are not equal!'})
    }

    const user_exists = await User.findOne({email: email})

    if(user_exists) {
        return res.status(422).json({msg: 'Please, use another email!'})
    }

    const salt = await bcrypt.genSalt(12)
    const password_hash = await bcrypt.hash(password, salt)

    const user = new User({
        name, 
        email,
        password: password_hash,
    })

    try {
        await user.save()
        res.status(201).json({msg: 'User succesfully created!'})
    } catch(error) {
        console.log(error)

        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        })
    }
})

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
        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        })
    }
})

router.post("/logout", checkToken, async (req, res) => {
    try {
        // Simplesmente remova o token do lado do cliente no logout
        res.status(200).json({ msg: "Logout successful!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An unexpected error happened in the server, try again later!" });
    }
});



//private route
router.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if(!user) {
        return res.status(404).json({msg: 'User not found!'})
    }

    res.status(200).json({user})
})

module.exports = router;
