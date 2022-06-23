const express = require('express')
const passport = require('passport')

const { uploadNone } = require('../../utils/multer.ultil')

const jobController = require('../../controllers/job.controller')

require('../../middlewares/passport.middleware')

const { validateBody, schemas } = require('../../helpers/validates/joi.job.helpes')

const router = express.Router()

router.get('/api/job', passport.authenticate('jwt', {
    session: false
}), jobController.getJob)

router.get('/api/job/:slug/:idJob', passport.authenticate('jwt', {
    session: false
}), jobController.getByJob)

router.post('/api/job', uploadNone(), validateBody(schemas.jobCreateSchema), passport.authenticate('jwt', {
    session: false
}), jobController.createJob)

router.patch('/api/job/:slug/:idJob', uploadNone(), validateBody(schemas.jobEditSchema), passport.authenticate('jwt', {
    session: false
}), jobController.editJob)

router.patch('/api/job/bin/:slug/:idJob', uploadNone(), passport.authenticate('jwt', {
    session: false
}), jobController.binJob)

router.patch('/api/job/restore/:slug/:idJob', uploadNone(), passport.authenticate('jwt', {
    session: false
}), jobController.restoreJob)

router.patch('/api/job/delete/:slug/:idJob', uploadNone(), passport.authenticate('jwt', {
    session: false
}), jobController.deleteJob)

router.patch('/api/job/is-active/:slug/:idJob', uploadNone(), passport.authenticate('jwt', {
    session: false
}), jobController.isActiveJob)

module.exports = router