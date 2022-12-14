const { checkSchema } = require("express-validator")

module.exports = {
  register: checkSchema({
    name: {
      trim: true,
      isLength: {
        options: { min: 2, max: 255 }
      },
      errorMessage: 'O nome não parece válido.'
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

  }),

  update: checkSchema({
    name: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 2, max: 255 }
      },
      errorMessage: 'O nome precisa ter ao menos 2 caracteres.'
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'O email não parece válido.'
    },
    phone: {
      optional: true,
      isLength: {
        options: { min: 8, max: 48 }
      },
      errorMessage: 'A senha deve ter entre 8 e 48 caracteres.'
    },
    password: {
      optional: true,
      isLength: {
        options: { min: 8, max: 48 }
      },
      errorMessage: 'A senha deve ter entre 8 e 48 caracteres.'
    },
    confirmPassword: {
      optional: true,
      isLength: {
        options: { min: 8, max: 48 }
      },
      errorMessage: 'A confirmação de senha deve ter entre 8 e 48 caracteres.'
    }

  })
}