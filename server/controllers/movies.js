require('dotenv').config();
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
const { checkToken } = require('../middleware/authentication.js');
const { cache } = require('../middleware/redisCache'); 
const { logger } = require('../services/logger.js');

router.post('/register', checkToken, cache.invalidate(), async (req, res) => {
    const { title, link_image, description } = req.body;

    if (!title) {
        //logger.warn(`Tentativa de criação de filme sem título pelo usuário ${req.user._id}`);
        return res.status(422).json({ msg: 'Title is required!' });
    }

    if (!link_image) {
        //logger.warn(`Tentativa de criação de filme sem link de imagem pelo usuário ${req.user._id}`);
        return res.status(422).json({ msg: 'Image link is required!' });
    }
    
    if (!description) {
        //logger.warn(`Tentativa de criação de filme sem descrição pelo usuário ${req.user._id}`);
        return res.status(422).json({ msg: 'Description is required!' });
    }

    const movie_exists = await Movie.findOne({ title: title });

    if (movie_exists) {
        //logger.warn(`Tentativa de criar filme com título duplicado '${title}' pelo usuário ${req.user._id}`);
        return res.status(422).json({ msg: 'Please, use another title!' });
    }

    const movie = new Movie({
        title,
        link_image,
        description
    });

    try {
        await movie.save();
        //logger.info(`Filme '${title}' criado com sucesso pelo usuário ${req.user._id}`);
        res.status(201).json({ msg: 'Movie successfully created!' });
    } catch (error) {
        //logger.error(`Erro ao criar o filme '${title}': ${error.message}`);
        res.status(500).json({
            msg: 'An unexpected error happened in the server, try again later!',
        });
    }
});

router.get('/list', checkToken, cache.route(), async (req, res) => {
    try {
        const movies = await Movie.find();
        //logger.info(`Listagem de filmes realizada pelo usuário ${req.user._id}`);
        res.status(200).json(movies);
    } catch (error) {
        //logger.error(`Erro ao listar filmes: ${error.message}`);
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
        //logger.info(`Busca de filmes realizada pelo usuário ${req.user._id} com o termo '${title}'`);
        res.status(200).json(movies);
    } catch (error) {
        //logger.error(`Erro ao buscar filmes com o termo '${title}': ${error.message}`);
        res.status(500).json({ msg: 'An unexpected error happened in the server, try again later!' });
    }
});

module.exports = router;
