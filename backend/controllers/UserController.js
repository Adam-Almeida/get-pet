const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt');
const CreateUserToken = require('../helpers/CreateUserToken');
const GetToken = require('../helpers/GetToken');
const { default: mongoose } = require('mongoose');

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
        let currentUser

        if(req.headers.authorization) {

            const decoded = jwt.verify(GetToken(req), process.env.SECRET)
            currentUser = await User.findById(decoded.user)
            currentUser.password = undefined

        }else{
            currentUser = null
        }

        res.status(200).json(currentUser)

    }

    static async getUserById(req, res) {
        const { id } =  req.params
        
        const validId =  mongoose.Types.ObjectId.isValid(id)

        if(!validId){
            res.status(422).json({
                "error": {
                    "_id": {
                        "msg": "O id informado não parece válido",
                    }
                }
            })
            return
        }

        const user = await User.findById(id)
        if(!user){
            res.status(422).json({
                "error": {
                    "user": {
                        "msg": "O usuário informado não existe",
                    }
                }
            })
            return
        }
        
        user.password = undefined
        res.status(200).json(user)
    }

}