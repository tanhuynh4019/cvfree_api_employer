const employerModel = require('../models/employer.model')

const typeModule = require('../modules/type.module')

const { sendHistorySlack } = require('../utils/slack.util')

const historyService = require('../services/history.service')

const plusCoin = async(user, coin, ip, contentHistory, contentSlack) => {
    try {
        const employer = await employerModel.findById(user._id)
        employer.coin = employer.coin + coin
        employer.save()

        //* send slack and save history
        sendHistorySlack(contentSlack)
        historyService.create({ idEmployer: user._id, content: contentHistory, ip, type: typeModule.HISTORY.COIN, role: typeModule.ROLE.EMPLOYER })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const minusCoin = async(user, coin, ip, contentHistory, contentSlack) => {
    try {
        const employer = await employerModel.findById(user._id)
        employer.coin = employer.coin - coin
        employer.save()

        //* send slack and save history
        sendHistorySlack(contentSlack)
        historyService.create({ idEmployer: user._id, content: contentHistory, ip, type: typeModule.HISTORY.COIN, role: typeModule.ROLE.EMPLOYER })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    plusCoin,
    minusCoin
}