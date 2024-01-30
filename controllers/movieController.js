const {Movie} = require('../models');

const getMovie = async (req, res) => {

    try {
        const movie = await Movie.findAll();

        res.status(200).json(
            movie
        );
        // const insertData = await Movie.create({
        //     title : req.body.title,
        //     synopsis : req.body.synopsis,
        //     trailerUrl : req.body.trailerUrl,
        //     imgUrl : req.body.imgUrl,
        //     rating : req.body.rating,
        //     status : req.body.status
        // })
        
        // res.status(201).json({
        //     message : "Succes creating new movie",
        //     // data : insertData
        // });  
    }
    catch(err) {
        console.error("Error find movie:", err);
        res.status(500).json({
            message: "Failed to find movie",
            error: err.message // Send the error message in the response
        });
    }
};

module.exports = {
    getMovie
};