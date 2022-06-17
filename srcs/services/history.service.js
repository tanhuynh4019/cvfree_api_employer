const historyModel = require('../models/history.model')

const create = async(body) => {
    await historyModel.create(body)
}

module.exports = {
    create
}