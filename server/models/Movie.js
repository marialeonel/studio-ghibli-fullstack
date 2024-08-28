const mongoose = require('mongoose')

const Movie = mongoose.model('Movie', {
   title: String,
   link_image: String,
   description: String,
   year: Number

})

module.exports = Movie