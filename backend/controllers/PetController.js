const { validationResult, matchedData } = require('express-validator')
const { default: mongoose } = require('mongoose')
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
        let { sort = 'asc', offset = 0, limit = 8 } = req.query

        try {

            const petsTotal = await Pet.find().exec()
            const total = petsTotal.length ?? 0

            const allPets = await Pet.find()
                .sort({ updatedAt: (sort == 'desc' ? -1 : 1) })
                .skip(parseInt(offset))
                .limit(parseInt(limit))
                .exec()

            res.json({ allPets, total })

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

    static async getAllUserPets(req, res) {
        const token = await GetToken(req)
        const user = await GetUserByToken(token)

        let { sort = 'asc', offset = 0, limit = 8 } = req.query

        try {

            const petsTotal = await Pet.find({ 'user._id': user._id }).exec()
            const total = petsTotal.length ?? 0

            const allPets = await Pet.find({ 'user._id': user._id })
                .sort({ updatedAt: (sort == 'desc' ? -1 : 1) })
                .skip(parseInt(offset))
                .limit(parseInt(limit))
                .exec()

            res.json({ allPets, total })

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

    static async getAllUserAdoptions(req, res) {
        const token = await GetToken(req)
        const user = await GetUserByToken(token)
        let { sort = 'asc', offset = 0, limit = 8 } = req.query

        try {

            const petsTotal = await Pet.find({ 'adopter._id': user._id }).exec()
            const total = petsTotal.length ?? 0

            const pets = await Pet.find({ 'adopter._id': user._id })
                .sort({ updatedAt: (sort == 'desc' ? -1 : 1) })
                .skip(parseInt(offset))
                .limit(parseInt(limit))
                .exec()

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

    static async getPetById(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({
                "error": {
                    "id": {
                        "msg": "O id informado não é válido.",
                        "location": "params"
                    }
                }
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({
                "error": {
                    "id": {
                        "msg": "O id informado não pertence a nenhum pet.",
                        "location": "params"
                    }
                }
            })
            return
        }

        res.status(200).json({ pet })
    }

    static async removePetById(req, res) {
        const { id } = req.params

        const token = await GetToken(req)
        const user = await GetUserByToken(token)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({
                "error": {
                    "id": {
                        "msg": "O id informado não é válido.",
                        "location": "params"
                    }
                }
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({
                "error": {
                    "id": {
                        "msg": "O id informado não pertence a nenhum pet.",
                        "location": "params"
                    }
                }
            })
            return
        }

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                "error": {
                    "user": {
                        "msg": "O pet informado não pertence a este usuário.",
                        "location": "params"
                    }
                }
            })
            return
        }

        try {
            await Pet.findByIdAndRemove(id)
            res.status(200).json({
                "success": {
                    "pet": {
                        "msg": "O pet foi removido com sucesso.",
                    }
                }
            })
            return
        } catch (error) {
            res.status(422).json({
                "error": {
                    "pet": {
                        "msg": "Tivemos um erro ao remover o pet.",
                        "error": error
                    }
                }
            })
            return
        }
    }

    static async update(req, res) {
        const { id } = req.params

        const token = await GetToken(req)
        const user = await GetUserByToken(token)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({
                "error": {
                    "id": {
                        "msg": "O id informado não é válido.",
                        "location": "params"
                    }
                }
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({
                "error": {
                    "id": {
                        "msg": "O id informado não pertence a nenhum pet.",
                        "location": "params"
                    }
                }
            })
            return
        }

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                "error": {
                    "user": {
                        "msg": "O pet informado não pertence a este usuário.",
                        "location": "params"
                    }
                }
            })
            return
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.mapped() })
            return
        }
        const data = matchedData(req)
        const newImages = req.files

        let images = [...pet.images]
        newImages.map((newImages) => {
            images.push(newImages.filename)
        })

        try {
            const updatedPet = await Pet.findOneAndUpdate(
                { _id: id },
                { $set: data, images },
                { new: true }
            )
            res.status(200).json({
                "success": {
                    "message": "Pet atualizado com sucesso",
                    "user": { updatedPet }
                }
            })

        } catch (error) {
            res.status(500).json({ error: error })
            return
        }

    }

    static async schedule(req, res) {
        const { id } = req.params

        const token = await GetToken(req)
        const user = await GetUserByToken(token)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({
                "error": {
                    "id": {
                        "msg": "O id informado não é válido.",
                        "location": "params"
                    }
                }
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({
                "error": {
                    "id": {
                        "msg": "O id informado não pertence a nenhum pet.",
                        "location": "params"
                    }
                }
            })
            return
        }

        if (pet.user._id.equals(user.id)) {
            res.status(422).json({
                "error": {
                    "pet": {
                        "msg": "Você não pode agendar uma visita para o seu próprio pet.",
                    }
                }
            })
            return
        }
        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                res.status(422).json({
                    "error": {
                        "pet": {
                            "msg": "Você já agendou uma visita para este pet.",
                        }
                    }
                })
                return
            }
        }

        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        try {
            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({
                "success": {
                    "message": `A visita foi agendada com sucesso, entre em contato com ${pet.user.name}`,
                }
            })

        } catch (error) {
            res.status(500).json({ error: error })
            return
        }
    }
}