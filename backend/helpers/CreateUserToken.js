const jwt = require('jsonwebtoken')

const CreateUserToken = async (user, req, res) => {

    const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 
      });

    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })
}

module.exports = CreateUserToken