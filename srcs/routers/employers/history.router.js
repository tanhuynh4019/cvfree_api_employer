const express = require('express')
const passport = require('passport')

require('../../middlewares/passport.middleware')

const historyController = require('../../controllers/history.controller')

const router = express.Router()

router.get('/api/history/get-account-history', passport.authenticate('jwt', {
    session: false
}), historyController.getAccountHistory)

module.exports = router