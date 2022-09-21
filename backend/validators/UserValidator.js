const { checkSchema } = require("express-validator")

module.exports = {
  register: checkSchema({
    name: {
      trim: true,
      isLength: {
        options: { min: 2, max: 255 }
      },
      errorMessage: 'O nome precisa ter ao menos 2 caracteres.'
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'O email não parece válido.'
    },
    phone: {
      isLength: {
        options: { min: 8, max: 48 }
      },
      errorMessage: 'A senha deve ter entre 8 e 48 caracteres.'
    },
    password: {
      isLength: {
        options: { min: 8, max: 48 }
      },
      errorMessage: 'A senha deve ter entre 8 e 48 caracteres.'
    },
    confirmPassword: {
      isLength: {
        options: { min: 8, max: 48 }
      },
      errorMessage: 'A confirmação de senha deve ter entre 8 e 48 caracteres.'
    }

  })
}