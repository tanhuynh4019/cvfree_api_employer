const express = require('express')
const passport = require('passport')

const jobController = require('../../controllers/job.controller')

require('../../middlewares/passport.middleware')

const router = express.Router()

router.get('/api/job', passport.authenticate('jwt', {
    session: false
}), jobController.getJob)

module.exports = router