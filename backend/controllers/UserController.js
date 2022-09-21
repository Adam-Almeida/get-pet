const User = require('../models/User')
const { validationResult, matchedData } = require('express-validator')

module.exports = class UserController {
    static async register(req, res) {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.mapped() })
            return
        }
        const data = matchedData(req)

        if (data.password !== data.confirmPassword) {
            res.status(422).json({
                "error": {
                    "confirmPassword": {
                        "msg": "As senhas informadas não conferem.",
                        "param": "confirmPassword",
                        "location": "body"
                    }
                }
            })
            return
        }

        res.json(data)
    }
}