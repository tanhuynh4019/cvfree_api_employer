const keyModule = require('../modules/key.module')
const typeModule = require('../modules/type.module')
const { INCORRECT } = require('../modules/message.module')

const historyModel = require('../models/history.model')

const create = async(body) => {
    try {
        await historyModel.create(body)
    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const getAccount = async(query, user, ip) => {

    try {
        const { key } = query

        //* validate
        if (key != keyModule.SERVICE.HISTORY) {
            setMessage(INCORRECT('Key'))
            return false
        }

        return await historyModel.find({ isActive: true, idEmployer: user._id, role: typeModule.ROLE.EMPLOYER, type: typeModule.HISTORY.ACCOUNT }).sort({
            dateCreate: -1
        })
    } catch (error) {
        setMessage(error.message);
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
    create,
    getAccount,
    getMessage
}