const historyService = require('../services/history.service')

const getAccountHistory = async(req, res) => {
    try {
        const history = await historyService.getAccount(req.query, req.user, req.ip)
        if (history) {
            res.status(200).json({ status: 200, error: false, message: historyService.getMessage(), data: history })
        } else {
            res.status(400).json({ status: 400, error: true, message: historyService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

module.exports = {
    getAccountHistory
}