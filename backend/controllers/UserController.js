const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt');
const CreateUserToken = require('../helpers/CreateUserToken');
const GetToken = require('../helpers/GetToken');
const { default: mongoose } = require('mongoose');
const GetUserByToken = require('../helpers/GetUserByToken');

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

        const emailExists = await User.findOne({ email })

        if (emailExists) {
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
            await CreateUserToken(newUser._id, req, res)

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async login(req, res) {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.mapped() })
            return
        }

        const data = matchedData(req)

        const { email, password } = data

        const user = await User.findOne({ email })

        if (!user) {
            res.status(422).json({
                "error": {
                    "email": {
                        "msg": "O usuário informado ainda não está cadastrado",
                        "param": "email",
                    }
                }
            })
            return
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(422).json({
                "error": {
                    "user/password": {
                        "msg": "O usuário ou senha informados não conferem",
                    }
                }
            })
            return
        }

        await CreateUserToken(user._id, req, res)

    }

    static async checkUser(req, res) {
        try {
            let currentUser

            if (req.headers.authorization) {

                const decoded = jwt.verify(GetToken(req), process.env.SECRET)
                currentUser = await User.findById(decoded.user)
                currentUser.password = undefined

            } else {
                currentUser = null
            }

            res.status(200).json(currentUser)
        } catch (error) {
            res.status(500).json({ error: error })
        }

    }

    static async getUserById(req, res) {
        const { id } = req.params

        const validId = mongoose.Types.ObjectId.isValid(id)

        if (!validId) {
            res.status(422).json({
                "error": {
                    "_id": {
                        "msg": "O id informado não parece válido",
                    }
                }
            })
            return
        }

        const user = await User.findById(id).select('-password')
        if (!user) {
            res.status(422).json({
                "error": {
                    "user": {
                        "msg": "O usuário informado não existe",
                    }
                }
            })
            return
        }

        res.status(200).json(user)
    }

    static async editUser(req, res) {
        const { id } = req.params

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.mapped() })
            return
        }
        const data = matchedData(req)
        const token = await GetToken(req)
        const user = await GetUserByToken(token)

        const validId = mongoose.Types.ObjectId.isValid(id)

        if (!validId) {
            res.status(422).json({
                "error": {
                    "_id": {
                        "msg": "O id informado não parece válido",
                    }
                }
            })
            return
        }

        if (!user) {
            res.status(422).json({
                "error": {
                    "user": {
                        "msg": "O usuário informado não existe",
                    }
                }
            })
            return
        }

        const { name, email, phone, password, confirmPassword } = data

        const userExists = await User.findOne({ email: email })
        if (user.email !== email && userExists) {
            res.status(422).json({
                "error": {
                    "email": {
                        "msg": "Por favor, utilize outro email",
                    }
                }
            })
            return
        }

        let image = ''

        if(req.file) {
            image = req.file.file
        }

        if (password !== null && password !== confirmPassword) {
            res.status(422).json({
                "error": {
                    "confirmPassword": {
                        "msg": "A senha e a confrimação de senha não conferem.",
                        "param": "confirmPassword",
                        "location": "body"
                    }
                }
            })

        } else if (password !== undefined && password === confirmPassword) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user.id },
                { $set: data },
                { new: true }
            ).select('-password')
            res.status(200).json({
                "success": {
                    "message": "Usuário atualizado com sucesso",
                    "user": { updatedUser }
                }
            })

        } catch (error) {
            res.status(500).json({ error: error })
            return
        }

    }

}