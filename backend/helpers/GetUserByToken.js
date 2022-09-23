const jwt = require('jsonwebtoken')

const User = require('../models/User')

const GetUserByToken = async (token) => {
    if (!token) {
        res.status(401).json({
            "token": {
                "msg": "Acesso negado",
            }
        })
        return
    }
    const decoded = jwt.verify(token, process.env.SECRET)
    const userId = decoded.user
    const user = await User.findById({_id: userId})
    return user
}

module.exports = GetUserByToken