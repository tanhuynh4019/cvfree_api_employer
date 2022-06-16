const keyModule = require('../modules/key.module')
const { INCORRECT } = require('../modules/message.module')
const employerModel = require('../models/employer.model')

const register = async(body, query) => {

    try {
        const { key } = query

        //* validate
        if (key != keyModule.SERVICE.AUTH) {
            setMessage(INCORRECT('Key'))
            return false
        }

        const create = await employerModel.create(body)

        setMessage('Đăng ký thành công!')
        return create

    } catch (error) {
        setMessage(error.code === 11000 ? 'E-mail đã tồn tại!' : error.message);
        return false
    }
}

const getMessage = () => {
    return this.message
}

const setMessage = (message) => {
    this.message = message
}

module.exports = {
    register,
    getMessage
}