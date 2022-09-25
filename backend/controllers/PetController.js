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
        if (!images.length) {
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

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt')
        res.status(200).json({
            pets: pets
        })
    }

    static async getList(req, res) {
        let { sort = 'asc', offset = 0, limit = 8, q, color } = req.query

        try {

            let filters = { status: true }

            if (q) {
                filters.name = { '$regex': q, '$options': 'i' }
            }

            if (color) {
                filters.color = { '$regex': color, '$options': 'i' }
            }

            const petsTotal = await Pet.find(filters).exec()
            const total = petsTotal.length ?? 0

            const all = await Pet.find(filters)
                .sort({ updatedAt: (sort == 'desc' ? -1 : 1) })
                .skip(parseInt(offset))
                .limit(parseInt(limit))
                .exec()

            let pets = []
            for (let i in all) {

                pets.push({
                    id: all[i]._id,
                    name: all[i].name,
                    age: all[i].age,
                    weight: all[i].weight,
                    images: all[i].images,
                    available: all[i].available,
                    user: all[i].user
                })

            }

            res.json({ pets, total })

        } catch (error) {
            res.status(422).json({
                "error": {
                    "limit/offset": {
                        "msg": "O limit ou o offset não parece um valor válido.",
                        "location": "query"
                    }
                }
            })
            return
        }
    }
}