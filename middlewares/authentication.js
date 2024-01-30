const {User} = require('../models');
const {verifyToken} = require('../helpers/jwt');

async function authentication(req,res,next) {
    try {
        const token = req.headers.token
        const username = req.body.username
        const password = req.body.password
        if (!token) {
            return res.status(401).json({
                "error" : "Unauthorized",
                "message" : "Please login first"
            })
        }
        const userDecoded = verifyToken(token)


        const findData = await User.findOne({
            where : {
                email : userDecoded
            },
            raw : true
        })
        try {
            if (!findData) {
                return res.status(401).json({
                    error : "Authentication Error",
                    devMessage : `User with id ${userDecoded.id} not found in database`
                })
            }
            res.locals.User = User
            return next()
        } catch (err) {
            return res.status(401).json(err)
        }
        
    } catch (err) {
        return res.status(401).json(err)
    }
}

module.exports = authentication