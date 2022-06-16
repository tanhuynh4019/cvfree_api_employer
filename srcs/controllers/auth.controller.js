const authService = require('../services/auth.service')

const registerAuth = async(req, res) => {
    try {
        const auth = await authService.register(req.body, req.query)
        if (auth) {
            res.status(200).json({ status: 200, error: true, message: authService.getMessage(), data: auth })
        } else {
            res.status(400).json({ status: 400, error: false, message: authService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: false, message: error.message })
    }
}

module.exports = {
    registerAuth
}