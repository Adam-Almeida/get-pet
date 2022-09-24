const { validationResult, matchedData } = require('express-validator')
const GetToken = require('../helpers/GetToken')
const GetUserByToken = require('../helpers/GetUserByToken')
const Pet = require('../models/Pet')

module.exports = class PetController {

    static async create(req, res) {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.mapped() })
            return
        }
        const data = matchedData(req)

        const { name, age, weight, color, available } = data
        const images = req.files

        const token = await GetToken(req)
        const user = await GetUserByToken(token)

        //images upload
        if(!images.length) {
            res.status(422).json({
                "error": {
                    "images": {
                        "msg": "A imagem é obrigatória.",
                        "param": "images",
                        "location": "body"
                    }
                }
            })
            return
        }

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({
                "success": {
                    "message": "Pet cadastrado com sucesso",
                    "pet": { newPet }
                }
            })
        } catch (error) {
            res.status(500).json({ error: error })
        }

    }
}