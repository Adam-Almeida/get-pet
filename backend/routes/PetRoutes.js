const express = require('express')
const router = express.Router()

const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')
const PetValidator = require('../validators/PetValidator')
const { imageUpload } = require('../helpers/ImageUpload')

router.post('/create', verifyToken, imageUpload.array('images'), PetValidator.create, PetController.create)
router.get('/', PetController.getList)

module.exports = router