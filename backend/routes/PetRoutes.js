const express = require('express')
const router = express.Router()

const PetController = require('../controllers/PetController')

router.post('/create', PetController.create)

module.exports = router