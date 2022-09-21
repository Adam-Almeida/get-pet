const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const UserValidator = require('../validators/UserValidator')

router.post('/register', UserValidator.register, UserController.register)

module.exports = router