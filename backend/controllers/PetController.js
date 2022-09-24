const Pet = require('../models/Pet')

module.exports = class PetController {

    static async create(req, res) {
        res.json({ message: "deu certo" })
    }
}