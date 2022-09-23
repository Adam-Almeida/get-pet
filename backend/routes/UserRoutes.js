const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const AuthValidator = require('../validators/AuthValidator')
const UserValidator = require('../validators/UserValidator')

const VerifyToken = require('../helpers/VerifyToken')

router.post('/register', UserValidator.register, UserController.register)
router.post('/login', AuthValidator.authLogin, UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', VerifyToken, UserValidator.update, UserController.editUser)

module.exports = router