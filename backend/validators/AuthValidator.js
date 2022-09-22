const { checkSchema } = require('express-validator')

module.exports = {
    authLogin: checkSchema({
        email: {
            trim: true,
            isLength: {
                options: { min: 2, max: 255 }
            },
            isEmail: true,
            errorMessage: 'O usuário ou senha informados não estão no padrão para logar.'
        },
        password: {
            isLength: {
                options: { min: 8, max: 48 }
            },
            errorMessage: 'O usuário ou senha informados não estão no padrão para logar.'
        }
    })
}
