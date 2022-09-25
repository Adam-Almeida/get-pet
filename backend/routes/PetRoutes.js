const express = require('express')
const router = express.Router()

const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')
const PetValidator = require('../validators/PetValidator')
const { imageUpload } = require('../helpers/ImageUpload')

router.post('/create', verifyToken, imageUpload.array('images'), PetValidator.create, PetController.create)
router.get('/', PetController.getList)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)

module.exports = router