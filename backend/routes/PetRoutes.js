const express = require('express')
const router = express.Router()

const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')
const PetValidator = require('../validators/PetValidator')

router.post('/create', verifyToken, PetValidator.create, PetController.create)

module.exports = router