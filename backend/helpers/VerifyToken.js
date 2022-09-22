const jwt = require('jsonwebtoken')
const GetToken = require('./GetToken')

const checkToken = (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(401).json({
            "token": {
                "msg": "Acesso negado",
            }
        })
    }

    const token = GetToken(req)

    if (!token) {
        res.status(401).json({
            "token": {
                "msg": "Acesso negado",
            }
        })
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(401).json({
            "token": {
                "msg": "Token inválido",
            }
        })
    }

}

module.exports = checkToken