const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const movieController = require('../controllers/movieController')
const authentication = require('../middlewares/authentication')

router.post('/register', userController.register);
router.get('/login', userController.login);
router.use(authentication)
router.get('/movies', movieController.getMovie)

module.exports = router;