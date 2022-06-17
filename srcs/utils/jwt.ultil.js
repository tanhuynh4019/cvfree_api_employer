const jwt = require('jsonwebtoken')

const {
    JWT_SECRET
} = require('../configs/jwt')

const endcodedToken = async(employerID) => {
    return jwt.sign({
        sub: employerID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3)
    }, JWT_SECRET)
}

module.exports = {
    endcodedToken
}