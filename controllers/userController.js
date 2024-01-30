const { Sequelize } = require('sequelize');
const {User} = require('../models');
const bcrypt = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
// const sequelize = require('../database');

const register = async (req, res) => {
    // await sequelize.sync()
    try {
        // const idExist = await User.findAll({
        //     attributes: ['username'],
        //     raw : true
        // })
        // for (key in idExist) {
        //     if (idExist.hasOwnProperty(key)) {
        //         if (idExist[key] == req.body.username) {
        //             return "ID EXIST"
        //         }
        //     }
        // }
        const insertData = await User.create({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        })
        
        res.status(201).json({
            message : "Succes creating new user",
            data : insertData});
    } catch(err) {
        console.log(err)        
    }
    
};

const login = async (req,res) => {
    try {
        const {email, password} = req.body

        const findData = await User.findOne({
            where : {
                email : email
            },
            raw : true
        })

        if (!findData) {
            throw {
                name : "User Login Error",
                devMessage : `User with email ${email} not found`
            }
        }

        const isCorrect = bcrypt.comparePassword(password, findData.password)

        if (!isCorrect) {
            throw {
                error : "Unauthorized",
                devMessage : "Invalid username/password"
            }
        }


        // let response = {
        //     id : findData.id,
        //     username : findData.username,
        //     email : findData.email
        // }

        const token = generateToken(email)

        return res.status(200).json({
            // message : "success",
            // data : response
            access: token,
            username : findData.username,
            role : findData.role,
            id : findData.id,

        })
    } catch(err) {
        return res.status(401).json(err)
    }
    
}

module.exports = {
    register,
    login
};