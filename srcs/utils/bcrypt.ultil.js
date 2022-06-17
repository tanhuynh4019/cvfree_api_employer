const bcrypt = require('bcryptjs')

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, salt)
    return passwordHashed
}

const comparePassword = async(password, passwordHash) => {
    try {
        return await bcrypt.compare(password, passwordHash)
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    hashPassword,
    comparePassword
}