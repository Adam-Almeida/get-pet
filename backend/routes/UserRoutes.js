const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const AuthValidator = require('../validators/AuthValidator')
const UserValidator = require('../validators/UserValidator')

router.post('/register', UserValidator.register, UserController.register)
router.post('/login', AuthValidator.authLogin, UserController.login)

module.exports = router