require('dotenv').config();
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
const {checkToken} = require('../middleware/authentication.js')

//register movie
router.post('/register', checkToken, async (req, res) => {
    const {title, link_image, description, year} = req.body;

    if(!title) {
        return res.status(422).json({ msg: 'Title is required!'})
    }

    if(!link_image) {
        return res.status(422).json({ msg: 'Image link is required!'})
    }
    if(!description) {
        return res.status(422).json({ msg: 'Description is required!'})
    }
    if(!year) {
        return res.status(422).json({ msg: 'Year is required!'})

    }
    const movie_exists = await Movie.findOne({title: title})

    if(movie_exists) {
        return res.status(422).json({msg: 'Please, use another title!'})
    }

    const movie = new Movie({
        title,
        link_image, 
        description,
        year
    })

    try {
        await movie.save()
        res.status(201).json({msg: 'Movie succesfully created!'})
    } catch(error) {
        console.log(error)

        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        })
    }
})

//get all movies
router.get('/list', checkToken, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);

    } catch(error){
        console.error(error);
        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        });
    }
})

// Search movies
router.get('/search', checkToken, async (req, res) => {
    const { title} = req.query;

    let query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' }; // Case insensitive search
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
