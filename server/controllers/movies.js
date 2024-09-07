require('dotenv').config();
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
const { checkToken } = require('../middleware/authentication.js');
const { cache } = require('../middleware/redisCache'); 
const { sanitizeValue } = require('../services/xssProtector.js');
const logger = require('../services/logger.js');

router.post('/new-movie', checkToken, cache.invalidate(), async (req, res) => {
    const { title, link_image, description } = req.body;

    const sanitizedTitle = sanitizeValue(title);
    const sanitizedLinkImage = sanitizeValue(link_image);
    const sanitizedDescription = sanitizeValue(description);

    if (!sanitizedTitle) {
        logger.warn(`Attempt to create untitled movie by user ${req.user.id}`);
        return res.status(422).json({ msg: 'Title is required!' });
    }

    if (!sanitizedLinkImage) {
        logger.warn(`Attempt to create movie without image link by user ${req.user.id}`);
        return res.status(422).json({ msg: 'Image link is required!' });
    }
    
    if (!sanitizedDescription) {
        logger.warn(`Attempt to create movie without description by user ${req.user.id}`);
        return res.status(422).json({ msg: 'Description is required!' });
    }

    const movie_exists = await Movie.findOne({ title: sanitizedTitle });

    if (movie_exists) {
        logger.warn(`Attempt to create movie with duplicated title '${title}' by user ${req.user.id}`);
        return res.status(422).json({ msg: 'Please, use another title!' });
    }

    const movie = new Movie({
        title: sanitizedTitle,
        link_image: sanitizedLinkImage,
        description: sanitizedDescription
    });

    try {
        await movie.save();

        logger.info(`Movie '${title}' succesfully created by user ${req.user.id}`);
        res.status(201).json({ msg: 'Movie successfully created!' });
    } catch (error) {
        logger.error(`Error creating movie '${title}': ${error.message}`);
        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        });
    }
});

router.get('/movies', checkToken, cache.route(), async (req, res) => {
    const { title } = req.query;

    let query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' }; 
    }

    try {
        const movies = await Movie.find(query);

        logger.info(`Movie search performed by user ${req.user.id} with the term '${title}'`);
        res.status(200).json(movies);
    } catch (error) {
        logger.error(`Error searching movie with the term '${title}': ${error.message}`);
        res.status(500).json({ msg: 'An unexpected error happened in the server, try again later!' });
    }
});

module.exports = router;
