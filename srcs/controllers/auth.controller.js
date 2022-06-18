const authService = require('../services/auth.service')

const registerAuth = async(req, res) => {
    try {
        const auth = await authService.register(req.body, req.query, req.ip)
        if (auth) {
            res.status(200).json({ status: 200, error: false, message: authService.getMessage(), data: auth })
        } else {
            res.status(400).json({ status: 400, error: true, message: authService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const loginAuth = async(req, res) => {
    try {
        const auth = await authService.login(req.query, req.user, req.ip)
        if (auth) {
            res.status(200).json({ status: 200, error: false, message: authService.getMessage(), data: auth })
        } else {
            res.status(400).json({ status: 400, error: true, message: authService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const secretAuth = async(req, res) => {
    try {
        const auth = await authService.secret(req.query, req.user, req.ip)
        if (auth) {
            res.status(200).json({ status: 200, error: false, message: authService.getMessage(), data: auth })
        } else {
            res.status(400).json({ status: 400, error: true, message: authService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const changePasswordAuth = async(req, res) => {
    try {
        const auth = await authService.changePassword(req.body, req.query, req.user, req.ip)
        if (auth) {
            res.status(200).json({ status: 200, error: false, message: authService.getMessage(), data: auth })
        } else {
            res.status(400).json({ status: 400, error: true, message: authService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const logOutAuth = async(req, res) => {
    try {
        const auth = await authService.logOut(req.query, req.user, req.ip)
        if (auth) {
            res.status(200).json({ status: 200, error: false, message: authService.getMessage(), data: auth })
        } else {
            res.status(400).json({ status: 400, error: true, message: authService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const editInfoAuth = async(req, res) => {
    try {
        const auth = await authService.editInfo(req.body, req.query, req.user, req.ip)
        if (auth) {
            res.status(200).json({ status: 200, error: false, message: authService.getMessage(), data: auth })
        } else {
            res.status(400).json({ status: 400, error: true, message: authService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

module.exports = {
    registerAuth,
    loginAuth,
    secretAuth,
    changePasswordAuth,
    logOutAuth,
    editInfoAuth
}