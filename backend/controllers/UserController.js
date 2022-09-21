const User = require('../models/User')
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')

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
                        "msg": "A senha e a confrimação de senha não conferem.",
                        "param": "confirmPassword",
                        "location": "body"
                    }
                }
            })
            return
        }

        const { name, phone, email, password } = data

        const emailExists = await User.findOne({email})

        if(emailExists){
            res.status(422).json({
                "error": {
                    "email": {
                        "msg": "Por favor, utilize outro email.",
                        "param": "email",
                    }
                }
            })
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            res.json(newUser)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}