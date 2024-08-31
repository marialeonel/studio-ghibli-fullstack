require('dotenv').config();
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
const { checkToken } = require('../middleware/authentication.js');
const { cache } = require('../middleware/redisCache'); 


router.post('/register', checkToken, cache.invalidate(), async (req, res) => {
    const { title, link_image, description } = req.body;
    console.log(req.user._id);

    if (!title) {
        return res.status(422).json({ msg: 'Title is required!' });
    }

    if (!link_image) {
        return res.status(422).json({ msg: 'Image link is required!' });
    }
    
    if (!description) {
        return res.status(422).json({ msg: 'Description is required!' });
    }

    const movie_exists = await Movie.findOne({ title: title });

    if (movie_exists) {
        return res.status(422).json({ msg: 'Please, use another title!' });
    }

    const movie = new Movie({
        title,
        link_image,
        description
    });

    try {
        await movie.save();
        res.status(201).json({ msg: 'Movie successfully created!' });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        });
    }
});

router.get('/list', checkToken, cache.route(), async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        });
    }
});

router.get('/search', checkToken, async (req, res) => {
    const { title } = req.query;

    let query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' }; 
    }

    try {
        const movies = await Movie.find(query);
        res.status(200).json(movies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error happened in the server, try again later!' });
    }
});

module.exports = router;
