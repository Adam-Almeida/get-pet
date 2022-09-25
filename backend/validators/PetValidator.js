const { checkSchema } = require('express-validator')

module.exports = {
    create: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { min: 1, max: 255 }
            },
            errorMessage: 'O nome não pode estar em branco'
        },
        age: {
            isNumeric: {
                errorMessage: 'Preencha a idade corretamente'
            }
        },
        weight: {
            isNumeric: {
                errorMessage: 'Preencha a idade corretamente'
            }
        },
        color: {
            trim: true,
            isLength: {
                options: { min: 3, max: 255 }
            },
            errorMessage: 'Prrencha a cor corretamente'
        },
        available: {
            optional: true,
            isBoolean: true,
            default: true
        }
    }),

    update: checkSchema({
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: { min: 1, max: 255 }
            },
            errorMessage: 'O nome não pode estar em branco'
        },
        age: {
            optional: true,
            isNumeric: {
                errorMessage: 'Preencha a idade corretamente'
            }
        },
        weight: {
            optional: true,
            isNumeric: {
                errorMessage: 'Preencha a idade corretamente'
            }
        },
        color: {
            optional: true,
            trim: true,
            isLength: {
                options: { min: 3, max: 255 }
            },
            errorMessage: 'Prrencha a cor corretamente'
        },
        available: {
            optional: true,
            isBoolean: true,
            default: true
        }
    })
}