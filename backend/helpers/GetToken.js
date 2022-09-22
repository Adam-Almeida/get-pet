const GetToken = (req) => {

    const authHeader = req.headers.authorization
    const [, token] = authHeader.split(" ")
    return token

}

module.exports = GetToken